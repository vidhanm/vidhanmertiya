"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { Github, Mail, Menu, X, ExternalLink, Sun, Moon, Download, Eye } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector("nav")
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isMenuOpen])

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/Vidhan-Resume.pdf"
    link.download = "Vidhan-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              className="md:hidden p-3 -ml-3 hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary px-4 py-2 rounded-lg ${activeSection === item.id
                    ? "text-primary-foreground bg-primary shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 text-sm font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg mx-2 ${activeSection === item.id ? "text-primary-foreground bg-primary" : "text-muted-foreground"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading text-xl font-semibold text-foreground">Resume - Vidhan Mertiya</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadResume}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Download size={16} />
                  Download Resume
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowResume(false)} className="p-2">
                  <X size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6 font-mono text-sm">
                <div className="text-center space-y-2">
                  <h1 className="font-heading text-2xl font-bold text-foreground">Vidhan Mertiya</h1>
                  <div className="text-muted-foreground space-y-1">
                    <p>+91 86199-42938</p>
                    <p>vidhanmertiya.vm@gmail.com</p>
                    <div className="flex justify-center gap-4 text-sm">
                      <a href="https://github.com/vidhanm" className="text-primary hover:underline">
                        GitHub
                      </a>
                      <a href="https://linkedin.com/in/vidhanmertiya" className="text-primary hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">Riverline | Software Engineering Intern</h3>
                        <span className="text-muted-foreground text-sm">Jan. 2026</span>
                      </div>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          Improved internal LLM prompts to increase reliability and consistency of outputs.
                        </li>
                        <li>
                          Fine-tuned LLM and speech-to-speech (voice-to-voice) models for internal use cases.
                        </li>
                        <li>
                          Set up the company's LLM evaluation framework to benchmark and monitor model performance.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">Ground Zero | Social Media Intern</h3>
                        <span className="text-muted-foreground text-sm">July 2024</span>
                      </div>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          Developed engaging social media content and contributed to the organization's daily
                          operations.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">Quest Alliance | Data Intern</h3>
                        <span className="text-muted-foreground text-sm">Dec. 2023 – Feb. 2024</span>
                      </div>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          Supported the Superset ITI dashboard, ensuring data accuracy and cleanliness through routine
                          health checks.
                        </li>
                        <li>
                          Collaborated with team managers to conduct a comprehensive placement analysis for ITI and VTI
                          graduates (2020–2023), identifying key trends.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">Quest Alliance | Intern</h3>
                        <span className="text-muted-foreground text-sm">Sept. 2021 – Nov. 2021</span>
                      </div>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>Designed knowledge products for Quest 2 Learn.</li>
                        <li>Conducted data analysis post-Quest 2 Learn 2021 event.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground">
                        JobSpy | Go, Python, Postgres, NextJS, Tailwind, Docker
                        <a
                          href="https://jobspy.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="secondary"
                            className="ml-2 text-xs hover:bg-primary/80 transition-colors cursor-pointer"
                          >
                            Live
                          </Badge>
                        </a>
                      </h3>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          A Webapp to list and search for jobs across all the major employment websites. Now users can
                          also upload their resumes and get job suggestions.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Household Services Application | TypeScript, HTML/CSS, Flask API, VueJS, SQLite, Git
                        <a
                          href="https://github.com/vidhanm/household-services"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs hover:bg-accent transition-colors cursor-pointer"
                          >
                            Repo
                          </Badge>
                        </a>
                      </h3>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          Developed a full-stack web application for on-demand household services, enabling users to
                          book professionals seamlessly. Integrated robust document verification to ensure trust and
                          security.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        RL-Based Voice Agent | FastAPI, Reinforcement Learning, PyTorch, NLU
                      </h3>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>
                          Built a DDQ (Dyna-style) agent for optimal conversation strategies using self-play.
                        </li>
                        <li>
                          Implemented 13 enhancements including semantic caching and multi-step planning.
                        </li>
                        <li>
                          Multilingual support (Hindi/Hinglish) and real-time evaluation dashboard.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        IITM Quizzes | React, Flask, Go, SQLite, TypeScript, LLM, TailWind, Radix UI
                        <a
                          href="https://iitmquizzes.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="secondary"
                            className="ml-2 text-xs hover:bg-primary/80 transition-colors cursor-pointer"
                          >
                            Live
                          </Badge>
                        </a>
                        <a
                          href="https://github.com/vidhanm/iitm-quizzes"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs hover:bg-accent transition-colors cursor-pointer"
                          >
                            Repo
                          </Badge>
                        </a>
                      </h3>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>Full Stack Web Application that lets users attempt quizzes.</li>
                        <li>Leveraged LLMs for generating explanations for each question.</li>
                        <li>Auto-Deployment using Github Actions.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        CoinCraft | Vue, Flask, SQLite, TypeScript, LLM, TailWind
                        <a
                          href="https://coincraft-two.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="secondary"
                            className="ml-2 text-xs hover:bg-primary/80 transition-colors cursor-pointer"
                          >
                            Live
                          </Badge>
                        </a>
                        <a
                          href="https://github.com/vidhanm/coincraft"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs hover:bg-accent transition-colors cursor-pointer"
                          >
                            Repo
                          </Badge>
                        </a>
                      </h3>
                      <ul className="text-muted-foreground text-sm mt-1 ml-4 list-disc">
                        <li>Full Stack Web Application to teach children about Financial Literacy.</li>
                        <li>Integrated AI-generated learning modules with gamification (coins, achievements).</li>
                        <li>Manage and Co-ordinate between multiple members for project.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                    Skills
                  </h2>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-foreground">Data Science:</span>{" "}
                      <span className="text-muted-foreground">
                        NumPy, Pandas, HuggingFace, BeautifulSoup, Selenium, SQL
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Developer:</span>{" "}
                      <span className="text-muted-foreground">
                        Python, Java, HTML, CSS, JavaScript, TypeScript, VueJS, Flask, Jinja, NextJS
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Tools:</span>{" "}
                      <span className="text-muted-foreground">
                        Git/GitHub, VS Code, Google Colab, Jupyter Notebook, Tableau, MS Excel
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">
                    Education
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">Indian Institute of Technology Madras</h3>
                        <span className="text-muted-foreground text-sm">2022 - 2026</span>
                      </div>
                      <p className="text-muted-foreground">Bachelor of Science, Data Science and Applications</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">University of Rajasthan</h3>
                        <span className="text-muted-foreground text-sm">2021 - 2024</span>
                      </div>
                      <p className="text-muted-foreground">Bachelor of Computer Applications</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-0 bg-gradient-to-br from-background via-background to-muted/20"
      >
        <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="font-heading text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground text-balance leading-tight">
              Hi, I'm <span className="text-primary">Vidhan Mertiya</span>
            </h1>
            <p className="font-heading text-xl xs:text-2xl sm:text-3xl text-muted-foreground max-w-3xl mx-auto text-balance font-medium">
              Building Scalable AI Evals & Full-Stack Systems
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Specializing in LLM Evaluation Frameworks, Scalable Web Applications, and Data-Driven Architectures.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 max-w-md xs:max-w-none mx-auto">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="w-full xs:w-auto min-h-[44px] bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View My Work
              </Button>
              <div className="flex gap-2 w-full xs:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowResume(true)}
                  className="flex-1 xs:flex-none min-h-[44px] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                >
                  <Eye size={18} className="mr-2" />
                  View Resume
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={downloadResume}
                  className="flex-1 xs:flex-none min-h-[44px] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 bg-transparent"
                >
                  <Download size={18} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div className="flex justify-center space-x-8 pt-6 sm:pt-8">
              <a
                href="https://github.com/vidhanm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-200 p-3 hover:bg-primary/10 rounded-lg hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:vidhanmertiya.vm@gmail.com"
                className="text-muted-foreground hover:text-primary transition-all duration-200 p-3 hover:bg-primary/10 rounded-lg hover:scale-110"
                aria-label="Send Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Learn more about my background, education, and professional experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">
                Education & Experience
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-heading font-semibold text-foreground mb-2">Professional Experience</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Riverline - Software Engineering Intern</p>
                      <p className="text-muted-foreground">Jan. 2026</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ground Zero - Social Media Intern</p>
                      <p className="text-muted-foreground">July 2024</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Quest Alliance - Data Intern</p>
                      <p className="text-muted-foreground">Dec 2023 – Feb 2024 & Sept 2021 – Nov 2021</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-heading font-semibold text-foreground mb-2">Education</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Indian Institute of Technology Madras</p>
                      <p className="text-muted-foreground">
                        Bachelor of Science, Data Science and Applications (2022 - 2026)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">University of Rajasthan</p>
                      <p className="text-muted-foreground">Bachelor of Computer Applications (2021 - 2024)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-3 text-lg">Data Science</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      NumPy
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Pandas
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      HuggingFace
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      BeautifulSoup
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Selenium
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      SQL
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-3 text-lg">Development</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Java
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      JavaScript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Vue.js
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Next.js
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Flask
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-3 text-lg">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Git/GitHub
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Docker
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      PostgreSQL
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Tableau
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      Go
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A showcase of my recent work spanning web development, data science, and full-stack applications
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">JobSpy</h3>
                        <Badge variant="secondary" className="text-xs shrink-0 bg-primary text-primary-foreground">
                          Live
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Go
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://jobspy.tech/"
                        className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                        aria-label="View JobSpy Live"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                    A comprehensive web application to list and search for jobs across all major employment websites.
                    Features resume upload functionality for personalized job suggestions using AI.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      Go
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      PostgreSQL
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Docker
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                        Household Services App
                      </h3>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Vue.js
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://github.com/vidhanm/household-services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                      aria-label="View Household Services App on GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                    Full-stack web application for on-demand household services, enabling users to book professionals
                    seamlessly. Features robust document verification for trust and security.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Vue.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Flask
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      SQLite
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                          RL-Based Voice Agent
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Keras
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://github.com/vidhanm/RL-DDQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                      aria-label="View RL-Based Voice Agent on GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                    DDQ (Dyna-style) reinforcement learning agent for optimal conversation strategies using self-play.
                    Features semantic caching, multi-step planning, and multilingual support (Hindi/Hinglish).
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      FastAPI
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Keras
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Reinforcement Learning
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      NLU
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">IITM Quizzes</h3>
                        <Badge variant="secondary" className="text-xs shrink-0 bg-primary text-primary-foreground">
                          Live
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          React
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://iitmquizzes.tech/"
                        className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                        aria-label="View IITM Quizzes Live"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href="https://github.com/vidhanm/iitm-quizzes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                        aria-label="View IITM Quizzes on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                    Full-stack web application for quiz attempts with LLM-generated explanations. Features
                    auto-deployment using GitHub Actions and modern UI components.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Flask
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Go
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      LLM
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">CoinCraft</h3>
                        <Badge variant="secondary" className="text-xs shrink-0 bg-primary text-primary-foreground">
                          Live
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Vue.js
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://coincraft-two.vercel.app/"
                        className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                        aria-label="View CoinCraft Live"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href="https://github.com/vidhanm/coincraft"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-all duration-200 p-2 hover:bg-primary/10 rounded-lg shrink-0 hover:scale-110"
                        aria-label="View CoinCraft on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                    Full-stack web application teaching children financial literacy through AI-generated learning
                    modules with gamification elements including coins and achievements.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      Vue.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Flask
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      SQLite
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      LLM
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">Explore More Projects</h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto text-pretty">
                Check out my GitHub profile for more projects, contributions, and open-source work
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 max-w-md xs:max-w-none mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full xs:w-auto bg-transparent min-h-[44px] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                >
                  <a
                    href="https://github.com/vidhanm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github size={20} />
                    View All Projects
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("contact")}
                  className="w-full xs:w-auto min-h-[44px] hover:bg-primary/10 transition-all duration-200"
                >
                  Let's Collaborate →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Let's connect and discuss opportunities, collaborations, or just have a chat about technology
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">
                      Let's Work Together
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed">
                      I'm always interested in new opportunities and exciting projects. Whether you're looking for a
                      developer, have a project in mind, or just want to connect, I'd love to hear from you.
                    </p>
                  </div>

                  <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
                    <Button
                      asChild
                      className="w-full xs:w-auto min-h-[44px] bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <a href="mailto:vidhanmertiya.vm@gmail.com" className="inline-flex items-center gap-2">
                        <Mail size={20} />
                        Send Email
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full xs:w-auto bg-transparent min-h-[44px] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                    >
                      <a
                        href="https://github.com/vidhanm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Github size={20} />
                        GitHub Profile
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowResume(true)}
                      className="w-full xs:w-auto bg-transparent min-h-[44px] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                    >
                      <Eye size={20} className="mr-2" />
                      View Resume
                    </Button>
                  </div>

                  <div className="text-center pt-6 border-t border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Based in India • Available for remote work and collaborations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2026 Vidhan Mertiya. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
