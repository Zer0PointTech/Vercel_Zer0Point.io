import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import SEO from '@/components/SEO';

export default function About() {
  const team = [
    {
      name: "Naji Masri",
      role: "Managing Partner",
      bio: "Naji Masri is a senior chemicals and industrials executive with deep expertise in business development, sustainability, and digital transformation across the Middle East and EMEA. Since starting his career in 2005, he has led high-impact commercial and transformation initiatives, built strategic partnerships, and driven market expansion programs—unlocking approximately €300 million in identified growth potential through partnership-led growth across petrochemical and consumer-oriented value chains. Previously, Naji held multiple leadership roles at BASF in the Middle East and Egypt, including Director of Business Development, Sustainability & Digitalization (through Dec 2025), Head of Strategy & Controlling, and Regional Digitalization Manager. Across these roles, he advised executive leadership on portfolio and market prioritization, performance management, and scalable digitalization—spanning AI-enabled decision support, supply chain optimization, and customer engagement transformation. Naji specializes in linking sustainability and digitalization to measurable commercial outcomes, including circular economy and chemical recycling business models, low-carbon and low-VOC strategies, and AI-driven supply chain and procurement improvement.",
      expertise: [
        "C-Suite Advisory & Stakeholder Management",
        "Commercial Strategy & Partnership-Led Growth",
        "AI/Digital Transformation",
        "Sustainability-to-Growth Strategy"
      ],
      linkedin: "https://linkedin.com/in/najimasri/",
      email: "najimasri@zer0point.io",
      image: "/images/naji-masri.png"
    },
    {
      name: "Daniel Khayat",
      role: "Managing Partner",
      bio: "Daniel Khayat is a senior executive with deep expertise in enterprise sales, business development, and regional growth strategy across the Middle East and Africa. He has led high‑impact commercial initiatives, expanded channel ecosystems, and delivered consistent revenue acceleration, earning recognition such as the 2023 Global Sales MVP Award. Previously serving as Head of Product at HTC MEA, Daniel drove a 25% increase in Telco and enterprise sales while shaping go‑to‑market strategies for advanced technology solutions. His career includes collaborations with leading global innovators including HTC, Magic Leap, Meta, Microsoft, Google, Qualcomm, HP, Dell, Nokia, and Sony, as well as major telecom operators across the Gulf and Africa. Daniel specializes in immersive B2B technology and XR enterprise deployments, leveraging AI‑powered post‑production platforms and integrated AI solutions for remote assistance, virtual collaboration, and VR‑based HSE and soft‑skills training. As a trusted advisor to C‑level leaders, he focuses on driving market penetration, unlocking scalable growth opportunities, and delivering transformative digital solutions that accelerate innovation for enterprise and government clients.",
      expertise: [
        "C‑Suite Engagement & Enterprise Relationship Building",
        "Partner & Ecosystem Collaboration",
        "Enterprise Sales Leadership & Deal Acceleration",
        "Complex Portfolio & Product Strategy Management"
      ],
      linkedin: "https://linkedin.com/in/danielkhayat",
      email: "danielkhayat@zer0point.io",
      image: "/images/daniel-khayat.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-20">
      <SEO 
        title="About Us - Leadership & Vision" 
        description="Meet the leadership team at Zer0Point Tech Ltd. Over 20 years of experience in driving growth, sustainability, and digital transformation."
        keywords="Naji Masri, Business Leadership, Consulting Team, Zer0Point Founders, Executive Team"
      />
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
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center overflow-hidden relative group-hover:border-primary/50 transition-colors duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${member.name === "Daniel Khayat" ? "object-[center_15%]" : "object-[center_5%]"}`} style={member.name === "Naji Masri" ? {paddingTop: '43px', paddingBottom: '2px', paddingLeft: '20px'} : undefined}
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
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary" style={{paddingRight: '4px'}}>
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
