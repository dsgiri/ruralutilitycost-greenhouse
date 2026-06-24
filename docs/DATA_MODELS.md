# Data Models & Schema

**Priority:** Critical #05
**Description:** Database tables, fields, types, and relationships

## Client-Side Models
- `ToolDef`: id, title, description, category, primaryOutcome, path
- `CropConfig`: id, name, yieldPerSqFt, pricePerLb, costPerSqFt
- `Scenario`: name, area, capexPsf, opexPsf, revenuePsf

## Local Storage
- `greenhouse_favorites`: Array of tool IDs
- `greenhouse_calculation_history`: Nested object mapping tool IDs to input state
