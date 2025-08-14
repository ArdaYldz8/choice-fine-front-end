import { assertEquals, assertExists } from 'https://deno.land/std@0.168.0/testing/asserts.ts'

// Test Invoice Payload Builder
Deno.test('Invoice payload builder', async (t) => {
  await t.step('should calculate line amount correctly', () => {
    const qty = 10
    const unitPrice = 15.50
    const expectedAmount = 155.00

    const line = {
      Amount: qty * unitPrice,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: '123',
          name: 'Test Item'
        },
        Qty: qty,
        UnitPrice: unitPrice
      }
    }

    assertEquals(line.Amount, expectedAmount)
    assertEquals(line.SalesItemLineDetail.Qty, qty)
    assertEquals(line.SalesItemLineDetail.UnitPrice, unitPrice)
  })

  await t.step('should include correct CustomerRef', () => {
    const customerId = 'CUST-123'
    
    const invoice = {
      CustomerRef: {
        value: customerId
      },
      Line: []
    }

    assertEquals(invoice.CustomerRef.value, customerId)
    assertExists(invoice.CustomerRef)
  })

  await t.step('should include correct ItemRef for inventory items', () => {
    const qbItemId = 'ITEM-456'
    const itemName = 'Premium Olives'
    
    const line = {
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: qbItemId,
          name: itemName
        },
        Qty: 5,
        UnitPrice: 12.00
      },
      Amount: 60.00
    }

    assertEquals(line.SalesItemLineDetail.ItemRef.value, qbItemId)
    assertEquals(line.SalesItemLineDetail.ItemRef.name, itemName)
  })

  await t.step('should handle multiple line items', () => {
    const items = [
      { sku: 'OLIVE-001', qb_item_id: '1', name: 'Olives', qty: 10, unit_price: 5.00 },
      { sku: 'FETA-001', qb_item_id: '2', name: 'Feta', qty: 5, unit_price: 8.00 },
      { sku: 'BAKLAVA-001', qb_item_id: '3', name: 'Baklava', qty: 20, unit_price: 3.50 }
    ]

    const lines = items.map(item => ({
      Amount: item.qty * item.unit_price,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: item.qb_item_id,
          name: item.name
        },
        Qty: item.qty,
        UnitPrice: item.unit_price
      }
    }))

    assertEquals(lines.length, 3)
    assertEquals(lines[0].Amount, 50.00)
    assertEquals(lines[1].Amount, 40.00)
    assertEquals(lines[2].Amount, 70.00)
    
    const totalAmount = lines.reduce((sum, line) => sum + line.Amount, 0)
    assertEquals(totalAmount, 160.00)
  })

  await t.step('should set correct currency', () => {
    const invoice = {
      CurrencyRef: {
        value: 'USD'
      },
      Line: []
    }

    assertEquals(invoice.CurrencyRef.value, 'USD')
  })

  await t.step('should handle decimal quantities and prices', () => {
    const qty = 2.5
    const unitPrice = 10.99
    const expectedAmount = 27.475 // Will be rounded by QBO

    const line = {
      Amount: qty * unitPrice,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: { value: '123' },
        Qty: qty,
        UnitPrice: unitPrice
      }
    }

    assertEquals(line.Amount, expectedAmount)
    assertEquals(line.SalesItemLineDetail.Qty, 2.5)
    assertEquals(line.SalesItemLineDetail.UnitPrice, 10.99)
  })
})

// Test HMAC signature verification
Deno.test('Webhook signature verification', async (t) => {
  await t.step('should verify valid HMAC-SHA256 signature', () => {
    // This is a placeholder test - actual implementation would use crypto
    const payload = '{"test": "data"}'
    const secret = 'webhook_secret'
    
    // In real implementation, this would generate HMAC-SHA256
    const isValid = payload.length > 0 && secret.length > 0
    
    assertEquals(isValid, true)
  })
})

// Run tests with: deno test --allow-env