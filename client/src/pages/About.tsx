import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Naji Masri",
      role: "Managing Partner",
      bio: "An experienced business leader with over 18 years of success in driving growth, sustainability, and digital transformation across the chemical and industrial sectors. Naji has a proven track record of unlocking €300M in growth potential through strategic partnerships and leading executive-level commercial operations. His expertise spans business development, ESG-driven initiatives, and supply chain optimization using AI and digital twins. He is committed to innovation and delivering long-term value in complex global markets.",
      expertise: ["Business Development", "Sustainability & ESG", "Digital Transformation", "Strategic Planning"],
      linkedin: "https://linkedin.com/in/najimasri/",
      email: "najimasri@gmail.com",
      image: "/images/naji-masri.png"
    },
    {
      name: "Daniel Khayat",
      role: "Managing Partner",
      bio: "A senior leader with 15+ years of experience driving enterprise technology adoption across the MEA region. Daniel specializes in AI, XR, and IoT solutions, having delivered multimillion-dollar wins for major entities like Aramco, NEOM, and STC. Recognized as a Global Sales MVP, he excels in structuring complex deals, building partner ecosystems, and guiding C-suite stakeholders through digital transformation. His deep regional expertise and trilingual capabilities (Arabic, English, French) make him a trusted advisor for government and enterprise clients.",
      expertise: ["AI & XR Sales Strategy", "Enterprise Account Management", "GTM Execution", "Public Sector Engagement"],
      linkedin: "https://linkedin.com/in/danielkhayat",
      email: "dkhayat@gmail.com",
      image: "/images/daniel-khayat.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Meet the <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Decades of combined experience in driving growth, innovation, and digital transformation across the GCC and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-white/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden relative group-hover:border-primary/50 transition-colors duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-2xl font-display font-bold text-center mb-2">{member.name}</h3>
                <p className="text-primary text-center font-medium mb-6">{member.role}</p>
                
                <p className="text-muted-foreground text-center mb-8 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider text-center">Core Expertise</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-6 border-t border-white/10">
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-background transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-background transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
