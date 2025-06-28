#!/bin/bash

# Test Edge Function for User Approval (Edge Function Test Scripti)
# Usage: ./test-edge-function.sh <user_id> <admin_jwt_token>

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SUPABASE_URL="https://oshjfdiwrbhakvdzdubr.supabase.co"
FUNCTION_URL="${SUPABASE_URL}/functions/v1/approve-user"

# Check parameters
if [ $# -ne 2 ]; then
    echo -e "${RED}Usage: $0 <user_id> <admin_jwt_token>${NC}"
    echo "Example: $0 123e4567-e89b-12d3-a456-426614174000 eyJhbGciOiJIUzI1NiI..."
    exit 1
fi

USER_ID=$1
ADMIN_TOKEN=$2

echo -e "${BLUE}Testing Edge Function: approve-user${NC}"
echo -e "${BLUE}URL: ${FUNCTION_URL}${NC}"
echo -e "${BLUE}User ID: ${USER_ID}${NC}"
echo ""

# Test 1: Valid approval request
echo -e "${YELLOW}Test 1: Valid approval request${NC}"
echo "----------------------------------------"

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X POST \
  "${FUNCTION_URL}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -d "{\"uid\": \"${USER_ID}\"}")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "Response Body:"
echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
echo ""
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ Test 1 PASSED${NC}"
else
    echo -e "${RED}❌ Test 1 FAILED${NC}"
fi

echo ""

# Test 2: Missing uid parameter
echo -e "${YELLOW}Test 2: Missing uid parameter${NC}"
echo "----------------------------------------"

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X POST \
  "${FUNCTION_URL}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -d "{}")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "Response Body:"
echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
echo ""
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 400 ]; then
    echo -e "${GREEN}✅ Test 2 PASSED (Expected 400)${NC}"
else
    echo -e "${RED}❌ Test 2 FAILED (Expected 400, got $HTTP_STATUS)${NC}"
fi

echo ""

# Test 3: Missing authorization header
echo -e "${YELLOW}Test 3: Missing authorization header${NC}"
echo "----------------------------------------"

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X POST \
  "${FUNCTION_URL}" \
  -H "Content-Type: application/json" \
  -d "{\"uid\": \"${USER_ID}\"}")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "Response Body:"
echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
echo ""
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 401 ]; then
    echo -e "${GREEN}✅ Test 3 PASSED (Expected 401)${NC}"
else
    echo -e "${RED}❌ Test 3 FAILED (Expected 401, got $HTTP_STATUS)${NC}"
fi

echo ""

# Test 4: Invalid user ID
echo -e "${YELLOW}Test 4: Invalid user ID${NC}"
echo "----------------------------------------"

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X POST \
  "${FUNCTION_URL}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -d "{\"uid\": \"invalid-uuid\"}")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "Response Body:"
echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
echo ""
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 404 ] || [ "$HTTP_STATUS" -eq 500 ]; then
    echo -e "${GREEN}✅ Test 4 PASSED (Expected 404/500)${NC}"
else
    echo -e "${RED}❌ Test 4 FAILED (Expected 404/500, got $HTTP_STATUS)${NC}"
fi

echo ""

# Test 5: CORS preflight request
echo -e "${YELLOW}Test 5: CORS preflight request${NC}"
echo "----------------------------------------"

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X OPTIONS \
  "${FUNCTION_URL}" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: authorization,content-type")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "Response Body:"
echo "$HTTP_BODY"
echo ""
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ Test 5 PASSED${NC}"
else
    echo -e "${RED}❌ Test 5 FAILED${NC}"
fi

echo ""
echo -e "${BLUE}Test Summary Completed${NC}"
echo "========================================"

# Expected output sample:
cat << 'EOF'

Expected Sample Output:
=======================

Test 1: Valid approval request
----------------------------------------
Response Body:
{
  "message": "User approved successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "Test User",
    "email": "test@example.com",
    "approved": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:35:15.123Z"
  }
}

HTTP Status: 200
✅ Test 1 PASSED

Test 2: Missing uid parameter
----------------------------------------
Response Body:
{
  "error": "Missing uid parameter"
}

HTTP Status: 400
✅ Test 2 PASSED (Expected 400)

Test 3: Missing authorization header
----------------------------------------
Response Body:
{
  "error": "Missing authorization header"
}

HTTP Status: 401
✅ Test 3 PASSED (Expected 401)

EOF 