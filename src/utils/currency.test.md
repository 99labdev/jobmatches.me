# Currency Detection - How it Works

## Overview
This system automatically detects the user's country and displays prices in the appropriate currency:
- **Brazil (BR)**: Prices in BRL (R$)
- **All other countries**: Prices in USD ($)

## Implementation

### 1. Detection Logic (`src/utils/currency.ts`)
The system uses two methods to detect if the user is from Brazil:

1. **Primary**: Vercel's geolocation header (`x-vercel-ip-country`)
   - Most reliable when deployed on Vercel
   - Works automatically in production

2. **Fallback**: Accept-Language header
   - Checks if the browser's language preference includes `pt-BR`
   - Works locally and on any hosting platform

### 2. Pricing Component (`src/components/Pricing.tsx`)
- Calls `getPricingLocale()` to determine the user's country
- Returns `'pt'` for Brazil (BRL prices) or `'en'` for others (USD prices)
- Loads the appropriate pricing translations dynamically

### 3. Translation Files
Prices are stored in translation files:

**Brazil (messages/pt.json)**:
```json
"price1": "R$9.90",
"price2": "R$39.90",
"price3": "R$59.90",
"perCredit1": "9,90 por crédito",
"perCredit2": "3,99 por crédito",
"perCredit3": "1,20 por crédito"
```

**Other countries (messages/en.json & messages/es.json)**:
```json
"price1": "$1.90",
"price2": "$7.90",
"price3": "$11.90",
"perCredit1": "$1.90 per credit",
"perCredit2": "$0.79 per credit",
"perCredit3": "$0.24 per credit"
```

## Testing

### Local Development
To test locally, you can modify request headers:

1. **Test Brazil (BRL)**:
   ```bash
   # Add header: x-vercel-ip-country: BR
   # Or browser language: pt-BR
   ```

2. **Test Other Countries (USD)**:
   ```bash
   # Add header: x-vercel-ip-country: US
   # Or any other browser language
   ```

### Production (Vercel)
On Vercel, the system automatically detects the user's real IP country:
- Users from Brazil will see BRL prices
- Users from any other country will see USD prices

## How User Language Selection Works
The user can still change the interface language:
- **Portuguese**: Interface in Portuguese
- **English**: Interface in English
- **Spanish**: Interface in Spanish

**Important**: Currency is independent of the selected language!
- A Brazilian user viewing the site in English will still see BRL prices
- A US user viewing the site in Portuguese will see USD prices

## Example Scenarios

| User Location | Browser Language | Selected Language | Currency Shown |
|--------------|------------------|-------------------|----------------|
| Brazil       | pt-BR           | Portuguese        | BRL (R$)       |
| Brazil       | pt-BR           | English           | BRL (R$)       |
| USA          | en-US           | Portuguese        | USD ($)        |
| USA          | en-US           | English           | USD ($)        |
| Spain        | es-ES           | Spanish           | USD ($)        |
| Argentina    | es-AR           | Spanish           | USD ($)        |

## Maintenance

### Adding New Countries/Currencies
To add support for a new country/currency:

1. Update `src/utils/currency.ts`:
   ```typescript
   export async function getCurrency(): Promise<"BRL" | "USD" | "EUR"> {
     const country = headersList.get("x-vercel-ip-country");
     if (country === "BR") return "BRL";
     if (country === "GB") return "EUR";
     return "USD";
   }
   ```

2. Add prices to translation files for the new currency

3. Update the `Pricing` component to handle the new currency

### Updating Prices
Simply edit the translation files:
- `messages/pt.json` for BRL prices
- `messages/en.json` and `messages/es.json` for USD prices
