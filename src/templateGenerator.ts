import { Paragraph, PageBreak, TextRun, AlignmentType, Table, TableCell, TableRow } from 'docx';
import { I18nService } from './i18n';
import { BookDivision, Configuration } from './configuration';
import { StatusCell, StatusCellSymbols } from './enum/statusCell';
import { DateHelper } from './helper/date';

export class TemplateGenerator {
    private config: Configuration;
    private i18n: I18nService;

    constructor(config: Configuration, i18n: I18nService) {
        this.config = config;
        this.i18n = i18n;
    }

    //
    // Helper Functions
    //

    private textToTextRunLines(text: string, breakCount: number = 1, bold: boolean = false, size: number = 24, initialBreakCount: number = 0): TextRun[] {
        const lines = text.split('\n');
        return lines.map((line, index) => new TextRun({
            text: line,
            bold: bold,
            size: size,
            break: index === 0 ? initialBreakCount : breakCount
        }));
    }

    private todoTableGenerateRows(rowCount: number, verticalCellMargin: number , statusCellSymbol: string, textSize: number): TableRow[] {
        const rows: TableRow[] = [];
        const t = this.i18n.getTranslations();

        const cellMargins = {
            top: verticalCellMargin,
            bottom: verticalCellMargin,
            left: 100,
            right: 100
        };

        const statusCellMargins = {
            top: verticalCellMargin,
            bottom: verticalCellMargin,
            left: 50,
            right: 50
        };

        // Append header row
        rows.push(new TableRow({ 
            children: [
                new TableCell({ 
                    children: [
                        new Paragraph({ 
                            children: [new TextRun({ text: `${t.TODO_TABLE.TASK}`, size: textSize })]
                        })
                    ],
                    width: { size: 60, type: 'pct' },
                    margins: cellMargins
                }),
                new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: `${t.TODO_TABLE.IMPORTANCE}`, size: textSize })] })],
                    width: { size: 10, type: 'pct' },
                    margins: cellMargins
                }),
                new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: `${t.TODO_TABLE.URGENCY}`, size: textSize })] })],
                    width: { size: 10, type: 'pct' },
                    margins: cellMargins
                }),
                new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: `${t.TODO_TABLE.DIFFICULTY}`, size: textSize })] })],
                    width: { size: 10, type: 'pct' },
                    margins: cellMargins
                }),
                new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: `${t.TODO_TABLE.STATUS}`, size: textSize })] })],
                    width: { size: 10, type: 'pct' },
                    margins: cellMargins
                })
            ]
        }));  

        // Append data rows
        for (let i = 0; i < rowCount; i++) {
            rows.push(new TableRow({
                children: [
                    new TableCell({ 
                        children: [new Paragraph({ children: [new TextRun({ text: '' , size: textSize })] })],
                        width: { size: 40, type: 'auto' },
                        margins: cellMargins
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ children: [new TextRun({ text: '' , size: textSize })] })],
                        width: { size: 10, type: 'auto' },
                        margins: cellMargins
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ children: [new TextRun({ text: '' , size: textSize })] })],
                        width: { size: 10, type: 'auto' },
                        margins: cellMargins
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ children: [new TextRun({ text: '' , size: textSize })] })],
                        width: { size: 10, type: 'auto' },
                        margins: cellMargins
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: statusCellSymbol, size: textSize, bold: true})] })],
                        width: { size: 30, type: 'auto' },
                        margins: statusCellMargins
                    })
                ]
            }));
        }

        return rows;
    }

    private timeTrackingTableGenerateRows(startHour: number, endHour: number, verticalCellMargin: number): TableRow[] {
        const rows: TableRow[] = [];
        const t = this.i18n.getTranslations();

        const cellMargins = {
            top: verticalCellMargin,
            bottom: verticalCellMargin,
            left: 50,
            right: 0
        };

        const textSize = this.config.contentTextSize;
        
        // Append header row
        rows.push(new TableRow({
            children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${t.TIME_TRACKING_TABLE.TIME}`, size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Plan A`, size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Plan B`, size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Plan C`, size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
            ]
        }));

        // Append data rows
        for (let i = startHour; i < endHour; i++) {
            rows.push(new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${i}:00 - ${i+1}:00` , size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `` , size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `` , size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `` , size: textSize })] })], width: { size: 25, type: 'pct' }, margins: cellMargins }),
                ]
            }));
        }

        return rows;
    }

    private paragraphPageBreak(): Paragraph {
        return new Paragraph({ children: [new PageBreak()] });
    }

    private paragraphLineBreak(breakCount: number = 1): Paragraph {
        return new Paragraph({ children: [new TextRun({ break: breakCount , size: 1})] });
    }
    
    private weeklyRoutineTableGenerateRows(startHour: number, endHour: number, verticalCellMargin: number): TableRow[] {
        const rows: TableRow[] = [];
        const t = this.i18n.getTranslations();

        const cellMargins = {
            top: verticalCellMargin,
            bottom: verticalCellMargin,
            left: 0,
            right: 0
        };

        const textSize = this.config.contentTextSize;
        
        const orderedDays: string[] = [];

        for (let i = 0; i < 7; i++) {
            const dayIndex = (this.config.firstDayOfWeek + i) % 7;
            orderedDays.push(t.DAYS[dayIndex]);
        }

        // Header Row
        const headerCells = [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${t.TIME_TRACKING_TABLE.TIME}`, size: textSize })] })], width: { size: 9, type: 'pct' }, margins: cellMargins })
        ];
        
        orderedDays.forEach(day => {
            headerCells.push(new TableCell({ 
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: day, size: textSize })] })],
                width: { size: 13, type: 'pct' }, 
                margins: cellMargins 
            }));
        });

        rows.push(new TableRow({ children: headerCells }));

        // Data Rows
        for (let i = startHour; i < endHour; i++) {
            // First half hour cell
            const firstHalfHourDataCells = [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${i}:00  ${i}:30` , size: textSize })] })], width: { size: 9, type: 'pct' }, margins: cellMargins}),
            ];
            
            for(let d = 0; d < 7; d++) {
                firstHalfHourDataCells.push(new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: ``, size: textSize })] })],
                    width: { size: 13, type: 'pct' },
                    margins: cellMargins
                }));
            }
            
            rows.push(new TableRow({ children: firstHalfHourDataCells }));

            // Second half hour cell
            const secondHalfHourDataCells = [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${i}:30  ${i+1}:00` , size: textSize })] })], width: { size: 9, type: 'pct' }, margins: cellMargins}),
            ];
            
            for(let d = 0; d < 7; d++) {
                secondHalfHourDataCells.push(new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: ``, size: textSize })] })],
                    width: { size: 13, type: 'pct' },
                    margins: cellMargins
                }));
            }
            
            rows.push(new TableRow({ children: secondHalfHourDataCells }));
        }

        return rows;
    }

    private divisionLabel(coverLabelKey: string): string {
        const t = this.i18n.getTranslations();
        return t.BOOK_DIVISION[coverLabelKey as keyof typeof t.BOOK_DIVISION];
    }

    //
    // Page Templates
    //

    public frontCoverTemplate(year: number, coverLabelKey: string): Paragraph {
        const t = this.i18n.getTranslations();
        const divisionLabel = this.divisionLabel(coverLabelKey);
        const children: (TextRun | PageBreak)[] = [
            new TextRun({
                text: `${year}`,
                bold: true,
                size: this.config.titleTextSize
            })
        ];
        
        // Add division label if provided (e.g., "Half 1", "Q1")
        if (coverLabelKey.length > 0 && divisionLabel) {
            children.push(new TextRun({
                text: divisionLabel,
                bold: false,
                size: this.config.titleTextSize * 0.5,
                break: 1
            }));
        }

        children.push(
            new TextRun({
                text: `${t.FRONT_COVER.TITLE}`,
                bold: true,
                size: this.config.titleTextSize,
                break: 2
            }),
            new TextRun({
                text: `${this.config.owner}`,
                bold: false,
                size: this.config.contentTextSize * 1.4,
                break: 3
            }),
            new TextRun({
                text: `${this.config.contact}`,
                bold: false,
                size: this.config.contentTextSize * 1.4,
                break: 1
            }),
            new PageBreak()
        );

        return new Paragraph({
            children,
            alignment: AlignmentType.CENTER,
            spacing: { after: 0, before: this.config.frontCoverInitialSpacing }
        });
    }

    public guidePageTemplate(): Paragraph {
        const t = this.i18n.getTranslations();
        const content = t.GUIDE_PAGE.CONTENT;

        const children: (TextRun | PageBreak)[] = [
            new TextRun({
                text: t.GUIDE_PAGE.TITLE,
                bold: true,
                size: this.config.titleTextSize
            })
        ];

        children.push(...this.textToTextRunLines(content, 1, false, this.config.contentTextSize, 2));
        children.push(new PageBreak());

        return new Paragraph({
            children,
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 }
        });
    }

    public weeklyRoutinePageTemplate(startHour: number, endHour: number): (Paragraph | Table)[] {
        const t = this.i18n.getTranslations();
        const title = new Paragraph({
            children: [
                new TextRun({
                    text: t.WEEKLY_ROUTINE_PAGE.TITLE,
                    bold: true,
                    size: this.config.titleTextSize
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 }
        });
        
        const routineTable = this.weeklyRoutineTableTemplate(startHour, endHour);
        const pageBreak = this.paragraphPageBreak();

        return [title, this.paragraphLineBreak(1), routineTable, pageBreak];
    }

    public yearlyTargetPageTemplate(year: number): (Paragraph | Table)[] {
        const title = this.yearlyTargetPageTitle(year);
        const todoTable = this.todoTableTemplate(true);
        const pageBreak = this.paragraphPageBreak();
        return [title, this.paragraphLineBreak(1), todoTable, pageBreak];
    }

    public monthlyTargetPageTemplate(monthNumber: number): (Paragraph | Table)[] {
        const t = this.i18n.getTranslations();
        const title = this.monthlyTargetPageTitle(t.MONTHS[monthNumber - 1]);
        const todoTable = this.todoTableTemplate(true);
        const pageBreak = this.paragraphPageBreak();
        return [title, this.paragraphLineBreak(1), todoTable, pageBreak];
    }

    public weeklyTargetPageTemplate(weekNumber: number, startDate: Date, endDate: Date): (Paragraph | Table)[] {
        const title = this.weeklyTargetPageTitle(weekNumber, startDate, endDate);
        const subtitle = this.weeklyTargetPageSubtitle(startDate, endDate);
        const todoTable = this.todoTableTemplate(true);
        const pageBreak = this.paragraphPageBreak();
        return [title, this.paragraphLineBreak(1), subtitle, this.paragraphLineBreak(1), todoTable, pageBreak];
    }

    public dailyTargetPageTemplate(date: Date , startHour: number, endHour: number): (Paragraph | Table)[] {
        const title = this.dailyTargetPageTitle(date);
        const subtitle = this.dailyTargetPageSubtitle();
        const todoTable = this.todoTableTemplate(false);
        const timeTrackingSubtitle = this.dailyTimeTrackingSubtitle();
        const timeTrackingTable = this.timeTrackingTableTemplate(startHour, endHour);
        const pageBreak = this.paragraphPageBreak();

        return [
            title, 
            this.paragraphLineBreak(1),
            subtitle, 
            this.paragraphLineBreak(1),
            todoTable, 
            this.paragraphLineBreak(1), 
            timeTrackingSubtitle, 
            this.paragraphLineBreak(1), 
            timeTrackingTable, 
            this.paragraphLineBreak(1), 
            pageBreak
        ];
    }

    //
    // Page Titles
    //

    private yearlyTargetPageTitle(year: number): Paragraph {
        const t = this.i18n.getTranslations();
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${year}`,
                    bold: true,
                    size: this.config.titleTextSize
                }),
                new TextRun({
                    text: `${t.YEARLY_TARGET_PAGE.TITLE}`,
                    bold: false,
                    italics: true,
                    size: this.config.contentTextSize,
                    break: 1
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }

    private monthlyTargetPageTitle(month: string): Paragraph {
        const t = this.i18n.getTranslations();
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${month.toUpperCase()}`,
                    bold: true,
                    size: this.config.titleTextSize
                }),
                new TextRun({
                    text: `${t.MONTHLY_TARGET_PAGE.TITLE}`,
                    bold: false,
                    italics: true,
                    size: this.config.contentTextSize,
                    break: 1
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }

    private weeklyTargetPageTitle(weekNumber: number, startDate: Date, endDate: Date): Paragraph {
        const t = this.i18n.getTranslations();
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${weekNumber}. ${t.WEEKLY_TARGET_PAGE.WEEK}`,
                    bold: true,
                    size: this.config.titleTextSize
                }),
                new TextRun({
                    text: `${t.WEEKLY_TARGET_PAGE.TITLE}`,
                    bold: false,
                    italics: true,
                    size: this.config.contentTextSize,
                    break: 1
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }

    private weeklyTargetPageSubtitle(startDate: Date, endDate: Date): Paragraph {
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${DateHelper.formatDate(startDate)} - ${DateHelper.formatDate(endDate)}`,
                    size: this.config.contentTextSize,
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }
    private dailyTargetPageTitle(date: Date): Paragraph {
        // Using locale from config if possible, defaulting to tr-TR for backwards compatibility if not specified
        const locale = this.config.language === 'tr' ? 'tr-TR' : 'en-US';
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric'})}`,
                    bold: true,
                    size: this.config.contentTextSize
                })
            ],
            alignment: AlignmentType.RIGHT,
            spacing: { after: 0 },
        });
    }

    private dailyTargetPageSubtitle(): Paragraph {
        const t = this.i18n.getTranslations();
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${t.DAILY_TARGET_PAGE.TITLE}`,
                    bold: false,
                    italics: true,
                    size: this.config.contentTextSize,
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }

    private dailyTimeTrackingSubtitle(): Paragraph {
        const t = this.i18n.getTranslations();
        return new Paragraph({
            children: [
                new TextRun({
                    text: `${t.DAILY_TARGET_PAGE.TIME_TRACKING_TITLE}`,
                    bold: false,
                    italics: true,
                    size: this.config.contentTextSize,
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
        });
    }

    //
    // Component Templates
    //

    private todoTableTemplate(fullPage: boolean): Table {
        let rowCounts = fullPage ? this.config.nonDailyPageTodoTableCellCount : this.config.dailyPageTodoTableCellCount;
        const verticalCellMargin = fullPage ? this.config.nonDailyPageTodoTableCellHeight : this.config.dailyPageTodoTableCellHeight;
        const statusCellSymbol = StatusCellSymbols[this.config.todoTableStatusCellType as StatusCell];
        const textSize = this.config.contentTextSize;

        return new Table({
            rows: this.todoTableGenerateRows(rowCounts, verticalCellMargin, statusCellSymbol, textSize),
            width: { size: 100, type: 'pct' },
            alignment: AlignmentType.CENTER,
        });
    }

    private timeTrackingTableTemplate(startHour: number, endHour: number): Table {
        const verticalCellMargin = this.config.timeTrackingTableCellHeight;

        return new Table({
            rows: this.timeTrackingTableGenerateRows(startHour, endHour, verticalCellMargin),
            width: { size: 100, type: 'pct' },
            alignment: AlignmentType.CENTER,
        });
    }

    private weeklyRoutineTableTemplate(startHour: number, endHour: number): Table {
        const verticalCellMargin = this.config.timeTrackingTableCellHeight;

        return new Table({
            rows: this.weeklyRoutineTableGenerateRows(startHour, endHour, verticalCellMargin),
            width: { size: 100, type: 'pct' },
            alignment: AlignmentType.CENTER,
        });
    }
}
