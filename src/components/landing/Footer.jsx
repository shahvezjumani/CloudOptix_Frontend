import { Cloud } from 'lucide-react'
import { Container } from './shared'

const FOOTER_LINKS = [
    { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookie Policy'] },
]

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/[0.05] py-12">
            <Container>
                <div className="grid md:grid-cols-5 gap-8 mb-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                <Cloud size={16} className="text-white" />
                            </div>
                            <span className="font-bold gradient-text-warm">CloudOptix</span>
                        </div>
                        <p className="text-xs text-white/35 leading-relaxed max-w-xs">
                            AI-powered file management that organises, searches and protects your documents automatically.
                        </p>
                    </div>

                    {FOOTER_LINKS.map(({ title, links }) => (
                        <div key={title}>
                            <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">{title}</div>
                            <ul className="flex flex-col gap-2">
                                {links.map((l) => (
                                    <li key={l}>
                                        <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/25">© 2026 CloudOptix Inc. All rights reserved.</p>
                    <p className="text-xs text-white/25">Built for teams who refuse to waste time searching.</p>
                </div>
            </Container>
        </footer>
    )
}
