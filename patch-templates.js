const fs = require('fs');

const patchTemplate = (path) => {
    let c = fs.readFileSync(path, 'utf8');
    
    // Patch export and hooks
    c = c.replace(/export default function (\w+)Template\(\{ data \}\: \{ data\: any \}\) \{/g, (match, name) => {
        return `export default function ${name}Template({ data, isPreview = false }: { data: any, isPreview?: boolean }) {`;
    });

    const hookSearch = /const \{ resolvedTheme, setTheme \} = useTheme\(\);[\s\S]+?const isDark = [^;]+;/;
    const hookReplace = `const { resolvedTheme, setTheme: setGlobalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const currentTheme = isPreview && localTheme ? localTheme : resolvedTheme;
    const isDark = !mounted || currentTheme === 'dark';

    const toggleTheme = () => {
        if (isPreview) {
            setLocalTheme(prev => (prev === 'dark' || (!prev && resolvedTheme === 'dark')) ? 'light' : 'dark');
        } else {
            setGlobalTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        }
    };`;

    c = c.replace(hookSearch, hookReplace);
    c = c.replace(/onClick=\{\(\) => setTheme\(isDark \? 'light' \: 'dark'\)\}/g, 'onClick={toggleTheme}');
    
    fs.writeFileSync(path, c, 'utf8');
};

patchTemplate('src/components/templates/MinimalTemplate.tsx');
patchTemplate('src/components/templates/CreativeTemplate.tsx');
// console.log('Templates patched successfully');
