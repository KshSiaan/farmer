import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function age() {
  return (
    <main className="bg-zinc-50">
      {/* Hero Section */}
      <section className="!py-12 md:!py-24 bg-zinc-900">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-50">
              Meet Our <span className="text-green-500">Team</span>
            </h1>
            <p className="max-w-[700px] text-zinc-400 md:text-xl">
              We&apos;re a diverse group of passionate individuals working
              together to build amazing products.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="!py-16 bg-zinc-50">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 !mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Executive <span className="text-green-600">Leadership</span>
            </h2>
            <p className="max-w-[700px] text-zinc-600">
              Our leadership team brings decades of experience and a shared
              vision for innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* IT Team */}
      <section className="!py-16 bg-zinc-100">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 !mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Information <span className="text-green-600">Technology</span>
            </h2>
            <p className="max-w-[700px] text-zinc-600">
              Our IT team builds and maintains the technology that powers our
              products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {itTeam.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Business Team */}
      <section className="!py-16 bg-zinc-50">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 !mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Business <span className="text-green-600">Development</span>
            </h2>
            <p className="max-w-[700px] text-zinc-600">
              Our business team drives growth and builds relationships with
              partners and customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {businessTeam.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="!py-16 bg-zinc-100">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 !mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Management <span className="text-green-600">Team</span>
            </h2>
            <p className="max-w-[700px] text-zinc-600">
              Our management team ensures smooth operations and strategic
              execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {managementTeam.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="!py-16 bg-green-600">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Join Our Team
              </h2>
              <p className="max-w-[500px] text-green-100">
                We&apos;re always looking for talented individuals to join our
                growing team.
              </p>
            </div>
            <Link
              href="/careers"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white !px-8 text-sm font-medium text-green-600 shadow transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-300"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Team Member Card Component
function TeamMemberCard({
  member,
  variant = "default",
}: {
  member: TeamMember;
  variant?: "default" | "compact";
}) {
  return (
    <div
      className={`
      bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg
      ${variant === "compact" ? "text-center" : ""}
    `}
    >
      <div
        className={`
        relative 
        ${variant === "compact" ? "h-40 w-40 !mx-auto !mt-6" : "h-64 w-full"}
      `}
      >
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="!p-6">
        <h3 className="text-lg font-bold text-zinc-900">{member.name}</h3>
        <p className="text-green-600 font-medium">{member.role}</p>
        {variant === "default" && (
          <p className="!mt-2 text-zinc-600 text-sm">{member.bio}</p>
        )}
        <div className="!mt-4 flex items-center justify-center gap-3">
          {member.social.linkedin && (
            <SocialLink
              href={member.social.linkedin}
              icon={<Linkedin className="h-4 w-4" />}
            />
          )}
          {member.social.twitter && (
            <SocialLink
              href={member.social.twitter}
              icon={<Twitter className="h-4 w-4" />}
            />
          )}
          {member.social.github && (
            <SocialLink
              href={member.social.github}
              icon={<Github className="h-4 w-4" />}
            />
          )}
          {member.email && (
            <SocialLink
              href={`mailto:${member.email}`}
              icon={<Mail className="h-4 w-4" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Social Link Component
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-green-100 hover:text-green-600"
    >
      {icon}
    </Link>
  );
}

// Types
type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  image: string;
  email?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

// Sample Data
const executives: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    bio: "Sarah has over 20 years of experience in the industry and has led the company to record growth since joining in 2015.",
    image: "/placeholder.svg?height=400&width=400",
    email: "sarah@example.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Michael oversees all technical aspects of the company and has been instrumental in developing our core products.",
    image: "/placeholder.svg?height=400&width=400",
    email: "michael@example.com",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Jessica Williams",
    role: "Chief Financial Officer",
    bio: "Jessica brings her financial expertise to ensure sustainable growth and strategic investments for our future.",
    image: "/placeholder.svg?height=400&width=400",
    email: "jessica@example.com",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];

const itTeam: TeamMember[] = [
  {
    name: "David Kim",
    role: "Lead Developer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Emma Rodriguez",
    role: "UX Designer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Olivia Martinez",
    role: "Frontend Developer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Daniel Lee",
    role: "Backend Developer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Sophia Garcia",
    role: "QA Engineer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Ethan Brown",
    role: "Mobile Developer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Ava Thompson",
    role: "UI Designer",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

const businessTeam: TeamMember[] = [
  {
    name: "Noah Clark",
    role: "Sales Director",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Isabella Wright",
    role: "Marketing Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "William Turner",
    role: "Business Analyst",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Charlotte Adams",
    role: "Account Executive",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Benjamin Scott",
    role: "Partnership Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Mia Nelson",
    role: "Content Strategist",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Henry Mitchell",
    role: "Sales Representative",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Amelia Carter",
    role: "Digital Marketing Specialist",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

const managementTeam: TeamMember[] = [
  {
    name: "Alexander Phillips",
    role: "Operations Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Sofia Campbell",
    role: "HR Director",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Lucas Parker",
    role: "Project Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Evelyn Morris",
    role: "Customer Success Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Jackson Reed",
    role: "Product Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Scarlett Cooper",
    role: "Office Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Leo Bailey",
    role: "Facilities Manager",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Victoria Gray",
    role: "Training Coordinator",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
