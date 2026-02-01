import * as fs from 'fs';
import * as path from 'path';
import { Document, Paragraph, Packer, Table } from 'docx';
import { TemplateGenerator } from './templateGenerator';
import { DateHelper } from './helper/date';
import { Configuration } from './configuration';

export class NotebookGenerator {
    private pages: (Paragraph | Table)[] = [];
    private templateGenerator: TemplateGenerator;
    private config: Configuration;

    constructor(templateGenerator: TemplateGenerator, config: Configuration) {
        this.templateGenerator = templateGenerator;
        this.config = config;
    }

    // Clear pages for new generation
    private clearPages(): void {
        this.pages = [];
    }

    // Generate front cover
    private generateFrontCover(coverLabelKey: string): void {
        this.pages.push(this.templateGenerator.frontCoverTemplate(this.config.year, coverLabelKey));
    }

    // Generate guide page
    private generateGuidePage(): void {
        this.pages.push(this.templateGenerator.guidePageTemplate());
    }

    // Generate weekly routine page
    private generateWeeklyRoutinePage(): void {
        this.pages.push(...this.templateGenerator.weeklyRoutinePageTemplate(
            this.config.timeTrackingTableStartHour,
            this.config.timeTrackingTableEndHour
        ));
    }

    // Generate yearly target page
    private generateYearlyTargetPage(): void {
        this.pages.push(...this.templateGenerator.yearlyTargetPageTemplate(this.config.year));
    }

    // Generate monthly target page
    private generateMonthlyTargetPage(monthNumber: number): void {
        this.pages.push(...this.templateGenerator.monthlyTargetPageTemplate(monthNumber));
    }

    // Generate weekly target page
    private generateWeeklyTargetPage(weekNum: number, startDate: Date, endDate: Date): void {
        this.pages.push(...this.templateGenerator.weeklyTargetPageTemplate(weekNum, startDate, endDate));
    }

    // Generate daily target page
    private generateDailyTargetPage(date: Date): void {
        this.pages.push(...this.templateGenerator.dailyTargetPageTemplate(
            date, 
            this.config.timeTrackingTableStartHour, 
            this.config.timeTrackingTableEndHour
        ));
    }

    // Generate DOCX file with optional label suffix
    private async generateDOCX(outputDir: string, label: string): Promise<void> {
        const suffix = label ? `_${label}` : '';
        const filename = `Time_Management_Notebook_${this.config.year}${suffix}.docx`;
        
        console.log(`📄 Generating ${filename}...`);

        const doc = new Document({
            sections: [
                {
                    children: this.pages,
                    properties: {
                        page:{
                            margin: {
                                top: this.config.pageMargin as any,
                                right: this.config.pageMargin as any,
                                bottom: this.config.pageMargin as any,
                                left: this.config.pageMargin as any
                            }
                        }
                    }
                }
            ],
            
        });

        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(path.join(outputDir, filename), buffer);
        console.log(`✓ Saved ${filename}`);
    }

    // Generate pages for a specific month range
    private generatePagesForRange(startMonth: number, endMonth: number, fileLabel: string, coverLabelKey: string): void {
        console.log(`\n📖 Generating pages for ${fileLabel || 'full year'} (months ${startMonth}-${endMonth})...\n`);

        // 1. Front cover with division label
        this.generateFrontCover(coverLabelKey);
        console.log('✓ Generated front cover');

        // 2. Guide page
        this.generateGuidePage();
        console.log('✓ Generated guide page');

        // 3. Weekly Routine page
        this.generateWeeklyRoutinePage();
        console.log('✓ Generated weekly routine page');

        // 4. Yearly target
        this.generateYearlyTargetPage();
        console.log('✓ Generated yearly target page');

        // 5-7. For each month in range: monthly page, then weeks with daily pages
        for (let month = startMonth; month <= endMonth; month++) {
            // Monthly target page
            this.generateMonthlyTargetPage(month);
            console.log(`✓ Generated ${DateHelper.getMonthName(month)} monthly target`);

            // Get all days in the month
            const daysInMonth = DateHelper.getDaysInMonth(month, this.config.year);
            let currentDay = 1;
            let weekNum = 1;

            while (currentDay <= daysInMonth) {
                // Calculate week start and end
                const weekStart = new Date(this.config.year, month - 1, currentDay);
                
                // Find next first day of week
                const weekEnd = DateHelper.getNextFirstDayOfWeek(weekStart, this.config.firstDayOfWeek);

                // Generate weekly target page
                this.generateWeeklyTargetPage(weekNum, weekStart, new Date(weekEnd.getTime() - 1));

                const dayCountToNextFirstDayOfWeek = (weekEnd.getDate() - weekStart.getDate());

                // Generate daily pages for this week
                const daysInWeek = Math.min(Math.abs(dayCountToNextFirstDayOfWeek), daysInMonth - currentDay + 1);
                for (let i = 0; i < daysInWeek; i++) {
                    const currentDate = new Date(this.config.year, month - 1, currentDay + i);
                    this.generateDailyTargetPage(currentDate);
                }

                console.log(`  ✓ Generated ${DateHelper.getMonthName(month)} Week ${weekNum} (${daysInWeek} days)`);

                currentDay += daysInWeek;
                weekNum++;
            }
        }
    }

    // Save pages to files based on book division
    public async saveToFiles(): Promise<void> {
        const outputDir = path.join(process.cwd(), 'notebook_output');

        // Create output directory
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Get month ranges based on book division
        const ranges = DateHelper.getMonthRanges(this.config.bookDivision);
        
        for (const range of ranges) {
            // Clear pages for each new file
            this.clearPages();
            
            // Generate pages for this range
            this.generatePagesForRange(range.startMonth, range.endMonth, range.fileLabel, range.coverLabelKey);
            
            // Save to file
            await this.generateDOCX(outputDir, range.fileLabel);
        }
        
        console.log(`\n📁 Notebook${ranges.length > 1 ? 's' : ''} saved to: ${outputDir}\n`);
    }
}
