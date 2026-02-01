# Time Management Notebook Generator

A TypeScript application that generates printable time management notebooks in DOCX format. Create structured planners with yearly, monthly, weekly, and daily planning pages to help you organize your goals and track your time effectively.

## What is This Project?

This project automatically generates comprehensive time management notebooks as Word documents (.docx). Each generated notebook includes:

- **Front Cover** - Customized with year and book division label
- **Guide Page** - Instructions on how to use the notebook
- **Weekly Routine Page** - Plan your recurring weekly schedule
- **Yearly Target Page** - Set and track your annual goals
- **Monthly Target Pages** - Define monthly tasks and goals
- **Weekly Target Pages** - Break down weekly objectives
- **Daily Target Pages** - Daily to-do lists with hourly time tracking

The notebooks can be divided into:
- **One** - Single file for the entire year
- **Half** - Two files (Jan-Jun, Jul-Dec)
- **Quarter** - Four files (Q1, Q2, Q3, Q4)

## Quick Start Guide

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd time-management-notebook

# Install dependencies
npm install
```

### Generate Your Notebook

1. **Configure** - Edit `config.json` to customize your notebook (see Configuration section below)

2. **Run the generator**

```bash
npm start
```

3. **Find your notebooks** - Generated files will be in the `notebook_output/` folder

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Generate the notebook |
| `npm run build` | Compile TypeScript to JavaScript |

## Configuration

All settings are managed in the `config.json` file at the project root.

### General Settings

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `language` | string | Language for notebook content (`en` or `tr`) | `"en"` |
| `year` | number | The year for the notebook | `2026` |
| `owner` | string | Owner name displayed on cover | `"John Doe"` |
| `contact` | string | Contact email displayed on cover | `"john@example.com"` |

### Book Division

| Property | Type | Description | Options |
|----------|------|-------------|---------|
| `bookDivision` | string | How to split the year | `"one"`, `"half"`, `"quarter"` |

- `"one"` - Single notebook for entire year
- `"half"` - Two notebooks (Half 1: Jan-Jun, Half 2: Jul-Dec)
- `"quarter"` - Four notebooks (Q1, Q2, Q3, Q4)

### Layout Settings

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `pageMargin` | string/number | Page margins | `"1.27cm"` |
| `frontCoverInitialSpacing` | number | Top spacing on cover page | `3000` |
| `titleTextSize` | number | Font size for titles | `48` |
| `contentTextSize` | number | Font size for content | `18` |

### Calendar Settings

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `firstDayOfWeek` | number | First day of week (0=Sun, 1=Mon, ...) | `1` |

### Todo Table Settings

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `todoTableStatusCellType` | string | Status cell style (`checkbox` or `empty`) | `"checkbox"` |
| `dailyPageTodoTableCellCount` | number | Number of todo rows on daily pages | `6` |
| `dailyPageTodoTableCellHeight` | number | Height of daily todo rows | `70` |
| `nonDailyPageTodoTableCellCount` | number | Number of todo rows on other pages | `20` |
| `nonDailyPageTodoTableCellHeight` | number | Height of non-daily todo rows | `80` |

### Time Tracking Settings

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `timeTrackingTableCellHeight` | number | Height of time tracking cells | `30` |
| `timeTrackingTableStartHour` | number | Start hour for time tracking (0-23) | `6` |
| `timeTrackingTableEndHour` | number | End hour for time tracking (1-24) | `24` |

### Example Configuration

```json
{
  "language": "en",
  "year": 2026,
  "owner": "John Doe",
  "contact": "john@example.com",
  "bookDivision": "quarter",
  "pageMargin": "1.27cm",
  "frontCoverInitialSpacing": 3000,
  "titleTextSize": 48,
  "contentTextSize": 18,
  "firstDayOfWeek": 1,
  "todoTableStatusCellType": "checkbox",
  "dailyPageTodoTableCellCount": 6,
  "dailyPageTodoTableCellHeight": 70,
  "nonDailyPageTodoTableCellCount": 20,
  "nonDailyPageTodoTableCellHeight": 80,
  "timeTrackingTableCellHeight": 30,
  "timeTrackingTableStartHour": 6,
  "timeTrackingTableEndHour": 24
}
```

## Output

Generated notebooks are saved to the `notebook_output/` directory with the naming pattern:

```
Time_Management_Notebook_{YEAR}_{DIVISION}.docx
```

Examples:
- `Time_Management_Notebook_2026.docx` (when bookDivision is "one")
- `Time_Management_Notebook_2026_H1.docx` (when bookDivision is "half")
- `Time_Management_Notebook_2026_Q1.docx` (when bookDivision is "quarter")
