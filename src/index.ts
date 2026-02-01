import { NotebookGenerator } from './notebookGenerator';
import { TemplateGenerator } from './templateGenerator';
import { Configuration } from './configuration';
import { I18nService } from './i18n';

async function main(): Promise<void> {
    console.log('🚀 Starting notebook generation...\n');
    try {
        // 1. Load configuration
        const config = Configuration.loadFromConfigFile();
        console.log('✓ Configuration loaded');
        console.log(`  - Year: ${config.year}`);
        console.log(`  - Book division: ${config.bookDivision}`);

        // 2. Initialize services
        const i18n = new I18nService(config.language);
        const templateGenerator = new TemplateGenerator(config, i18n);
        
        // 3. Initialize generator
        const generator = new NotebookGenerator(templateGenerator, config);
        
        // 4. Generate and save files
        await generator.saveToFiles();
        
        console.log('✨ Generation complete! Check the notebook_output folder.\n');
    } catch (error) {
        console.error('❌ Error generating notebook:', error);
        process.exit(1);
    }
}


main().catch(error => {
    console.error('❌ Error generating notebook:', error);
    process.exit(1);
});
