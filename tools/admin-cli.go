package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// Configuration struct
type Config struct {
	SupabaseURL    string
	ServiceRoleKey string
	EdgeFunctionURL string
}

// Response structures
type ApprovalResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

type Profile struct {
	ID        string    `json:"id"`
	FullName  string    `json:"full_name"`
	Email     string    `json:"email"`
	Approved  bool      `json:"approved"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CLI colors
const (
	Reset  = "\033[0m"
	Red    = "\033[31m"
	Green  = "\033[32m"
	Yellow = "\033[33m"
	Blue   = "\033[34m"
	Bold   = "\033[1m"
)

func main() {
	// Command line flags
	var (
		userID    = flag.String("u", "", "User ID to approve (UUID format)")
		listUsers = flag.Bool("list", false, "List all pending users")
		config    = flag.String("config", ".env", "Config file path")
		help      = flag.Bool("h", false, "Show help")
	)
	flag.Parse()

	if *help {
		showHelp()
		return
	}

	// Load configuration
	cfg, err := loadConfig(*config)
	if err != nil {
		fmt.Printf("%s❌ Error loading config: %v%s\n", Red, err, Reset)
		os.Exit(1)
	}

	// Handle commands
	switch {
	case *listUsers:
		if err := listPendingUsers(cfg); err != nil {
			fmt.Printf("%s❌ Error listing users: %v%s\n", Red, err, Reset)
			os.Exit(1)
		}
	case *userID != "":
		if err := approveUser(cfg, *userID); err != nil {
			fmt.Printf("%s❌ Error approving user: %v%s\n", Red, err, Reset)
			os.Exit(1)
		}
	default:
		fmt.Printf("%s⚠️  No command specified. Use -h for help.%s\n", Yellow, Reset)
		showHelp()
	}
}

func showHelp() {
	fmt.Printf("%s%sChoice Foods Admin CLI Tool%s\n", Bold, Blue, Reset)
	fmt.Println("=============================")
	fmt.Println()
	fmt.Println("Usage:")
	fmt.Printf("  %s./admin-cli -u <user-id>%s     Approve a user\n", Green, Reset)
	fmt.Printf("  %s./admin-cli -list%s            List pending users\n", Green, Reset)
	fmt.Printf("  %s./admin-cli -h%s               Show this help\n", Green, Reset)
	fmt.Println()
	fmt.Println("Examples:")
	fmt.Printf("  %s./admin-cli -u 123e4567-e89b-12d3-a456-426614174000%s\n", Yellow, Reset)
	fmt.Printf("  %s./admin-cli -list%s\n", Yellow, Reset)
	fmt.Println()
	fmt.Println("Environment variables:")
	fmt.Println("  SUPABASE_URL         - Your Supabase project URL")
	fmt.Println("  SUPABASE_SERVICE_KEY - Your Supabase service role key")
}

func loadConfig(configPath string) (*Config, error) {
	// Try to load from environment variables first
	cfg := &Config{
		SupabaseURL:    os.Getenv("SUPABASE_URL"),
		ServiceRoleKey: os.Getenv("SUPABASE_SERVICE_KEY"),
	}

	if cfg.SupabaseURL == "" {
		cfg.SupabaseURL = "https://oshjfdiwrbhakvdzdubr.supabase.co"
	}

	if cfg.ServiceRoleKey == "" {
		return nil, fmt.Errorf("SUPABASE_SERVICE_KEY environment variable is required")
	}

	cfg.EdgeFunctionURL = cfg.SupabaseURL + "/functions/v1/approve-user"

	return cfg, nil
}

func listPendingUsers(cfg *Config) error {
	fmt.Printf("%s📋 Fetching pending users...%s\n", Blue, Reset)

	// Create HTTP request to Supabase API
	url := cfg.SupabaseURL + "/rest/v1/profiles?approved=eq.false&select=*"
	
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return fmt.Errorf("creating request: %w", err)
	}

	req.Header.Set("apikey", cfg.ServiceRoleKey)
	req.Header.Set("Authorization", "Bearer "+cfg.ServiceRoleKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("making request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("reading response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API error (%d): %s", resp.StatusCode, string(body))
	}

	var profiles []Profile
	if err := json.Unmarshal(body, &profiles); err != nil {
		return fmt.Errorf("parsing response: %w", err)
	}

	// Display results
	fmt.Printf("\n%s%sPending Users (Total: %d)%s\n", Bold, Green, len(profiles), Reset)
	fmt.Println("================================")

	if len(profiles) == 0 {
		fmt.Printf("%s✅ No users pending approval%s\n", Green, Reset)
		return nil
	}

	for i, profile := range profiles {
		fmt.Printf("\n%d. %s%s%s\n", i+1, Bold, profile.FullName, Reset)
		fmt.Printf("   ID: %s\n", profile.ID)
		fmt.Printf("   Email: %s\n", profile.Email)
		fmt.Printf("   Created: %s\n", profile.CreatedAt.Format("2006-01-02 15:04:05"))
		fmt.Printf("   %sCommand: ./admin-cli -u %s%s\n", Yellow, profile.ID, Reset)
	}

	fmt.Println()
	return nil
}

func approveUser(cfg *Config, userID string) error {
	fmt.Printf("%s🔄 Approving user: %s%s\n", Blue, userID, Reset)

	// Prepare request payload
	payload := map[string]string{
		"uid": userID,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("marshaling payload: %w", err)
	}

	// Create HTTP request to Edge Function
	req, err := http.NewRequest("POST", cfg.EdgeFunctionURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("creating request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+cfg.ServiceRoleKey)

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("making request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("reading response: %w", err)
	}

	var result ApprovalResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return fmt.Errorf("parsing response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("approval failed (%d): %s", resp.StatusCode, result.Error)
	}

	// Success output
	fmt.Printf("%s✅ User approved successfully!%s\n", Green, Reset)
	fmt.Printf("Message: %s\n", result.Message)
	
	if result.Data != nil {
		fmt.Println("\nUser Details:")
		if dataBytes, err := json.MarshalIndent(result.Data, "", "  "); err == nil {
			fmt.Println(string(dataBytes))
		}
	}

	return nil
}

// Sample terminal output when running the CLI:
/*
$ go run admin-cli.go -list

📋 Fetching pending users...

Pending Users (Total: 2)
================================

1. Ahmet Yılmaz
   ID: 123e4567-e89b-12d3-a456-426614174000
   Email: ahmet@example.com
   Created: 2024-01-15 10:30:00
   Command: ./admin-cli -u 123e4567-e89b-12d3-a456-426614174000

2. Fatma Demir
   ID: 987fcdeb-51d2-4567-8901-123456789abc
   Email: fatma@example.com
   Created: 2024-01-15 11:15:22
   Command: ./admin-cli -u 987fcdeb-51d2-4567-8901-123456789abc

$ go run admin-cli.go -u 123e4567-e89b-12d3-a456-426614174000

🔄 Approving user: 123e4567-e89b-12d3-a456-426614174000
✅ User approved successfully!
Message: User approved successfully

User Details:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "full_name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "approved": true,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T12:45:30.123Z"
}
*/ 