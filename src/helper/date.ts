import { BookDivision } from "../configuration";

interface MonthRange {
    startMonth: number;
    endMonth: number;
    fileLabel: string;
    coverLabelKey: string;
}

class DateHelper {
    static getNextFirstDayOfWeek(date: Date , firstDayOfWeek: number) {
        let nextMonday = new Date(date.getTime());
        
        do {
            nextMonday.setDate(nextMonday.getDate() + 1);
        } while (nextMonday.getDay() !== firstDayOfWeek);

        return nextMonday;
    }
    static getMonthName(month: number): string {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month - 1];
    }

    static getDayName(date: Date): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    static getDaysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    static formatDate(date: Date): string {
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    }

    // Get month ranges based on book division setting
    static getMonthRanges(bookDivision: BookDivision): MonthRange[] {
        switch (bookDivision) {
            case 'half':
                return [
                    { startMonth: 1, endMonth: 6, fileLabel: 'H1', coverLabelKey: 'HALF_1' },
                    { startMonth: 7, endMonth: 12, fileLabel: 'H2', coverLabelKey: 'HALF_2' }
                ];
            case 'quarter':
                return [
                    { startMonth: 1, endMonth: 3, fileLabel: 'Q1', coverLabelKey: 'QUARTER_1' },
                    { startMonth: 4, endMonth: 6, fileLabel: 'Q2', coverLabelKey: 'QUARTER_2' },
                    { startMonth: 7, endMonth: 9, fileLabel: 'Q3', coverLabelKey: 'QUARTER_3' },
                    { startMonth: 10, endMonth: 12, fileLabel: 'Q4', coverLabelKey: 'QUARTER_4' }
                ];
            case 'one':
            default:
                return [
                    { startMonth: 1, endMonth: 12, fileLabel: '', coverLabelKey: '' }
                ];
        }
    }
}

export { DateHelper };