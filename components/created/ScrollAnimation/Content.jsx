"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

function ImageComp({ id, src, title, description }) {
  const ref = useRef(null)

  // Get heading text based on image id
  const getHeadingText = () => {
    switch (id) {
      case 1:
        return "Report a Problem"
      case 2:
        return "Complaint Gets Logged"
      case 3:
        return "Track Complaint Status"
      default:
        return ""
    }
  }

  // Get subheading text based on image id
  const getSubheadingText = () => {
    switch (id) {
      case 1:
        return "Select the category, location, and describe the issue anonymously or with contact."
      case 2:
        return "Your complaint is categorized and sent to the concerned transport authority."
      case 3:
        return "Get a unique complaint ID to check real-time updates and resolution status."
      default:
        return ""
    }
  }

  return (
    <section className="img-container mx-auto">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
      >
        <motion.h1
          initial={{ letterSpacing: "-5px" }}
          whileInView={{ letterSpacing: "0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        >
          {getHeadingText()}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        >
          {getSubheadingText()}
        </motion.p>
      </motion.div>

      <div ref={ref} className="img-wrapper">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            },
          }}
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        >
          <Image
            width={500}
            height={600}
            src={src}
            alt="Process illustration"
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}

const content = [
  {
    src: "/pensive-businessman-talking-phone-while-commuting-by-bus_637285-11713.avif",
    title: "✅ Report a Problem",
    description:
      "Select the category, location, and describe the issue anonymously or with contact.",
  },
  {
    src: "/woman-wearing-string-finger-reminder.jpg",
    title: "🗂 Complaint Gets Logged",
    description:
      "Your complaint is categorized and sent to the concerned transport authority.",
  },
  {
    src: "/emailing.jpg",
    title: "📍 Track Complaint Status",
    description:
      "Get a unique complaint ID to check real-time updates and resolution status.",
  },
]

export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div id="example">
      {content.map((item, index) => (
        <ImageComp
          key={index}
          id={index + 1}
          src={item.src}
          title={item.title}
          description={item.description}
        />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  )
}

function StyleSheet() {
  return (
    <style>{`
      .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 1rem;
      }

      .img-wrapper {
        width: 100%;
        max-width: 600px;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
      }

      .img-wrapper img {
        width: 100%;
        height: auto;
        border-radius: 20px;
        object-fit: cover;
      }

      .section-heading {
        text-align: center;
        z-index: 10;
        pointer-events: none;
        padding: 0 1rem;
      }

      .section-heading h1 {
        font-family: "Azeret Mono", monospace;
        font-size: 3rem;
        font-weight: 700;
        color: var(--hue-6);
        margin: 0;
        text-transform: uppercase;
      }

      .section-heading p {
        font-family: "Inter", sans-serif;
        font-size: 1.2rem;
        color: var(--white);
        margin: 0.5rem 0 0;
        opacity: 0.8;
      }

      .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: var(--hue-6);
        bottom: 50px;
        transform: scaleX(0);
      }

      @media (max-width: 1024px) {
        .section-heading h1 {
          font-size: 2.5rem;
        }
        .section-heading p {
          font-size: 1rem;
        }
      }

      @media (max-width: 768px) {
        .img-container {
          height: fit-content;
          padding: 4rem 1rem;
        }
        .section-heading h1 {
          font-size: 2rem;
        }
        .section-heading p {
          font-size: 0.95rem;
        }
      }

      @media (max-width: 500px) {
        .section-heading h1 {
          font-size: 1.5rem;
        }
        .section-heading p {
          font-size: 0.85rem;
        }
        .img-wrapper {
          max-width: 90%;
        }
        .img-wrapper img {
          border-radius: 15px;
        }
      }
    `}</style>
  )
}
