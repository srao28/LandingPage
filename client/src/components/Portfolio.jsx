export default function Portfolio() {
  return (
    <>
      <h1>Samarth Pradeep Rao</h1>
      <p className="contact">
        <a href="tel:6025660282">602-566-0282</a> ·{' '}
        <a href="mailto:srao65@asu.edu">srao65@asu.edu</a> · Tempe, AZ ·{' '}
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        ·{' '}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>

      <section>
        <h2>Education</h2>
        <p>
          <strong>Bachelor of Science, Computer Science</strong> · Arizona State
          University
        </p>
        <p className="meta">
          GPA 3.8/4.0 · Expected May 2026 · Dean's List · New American University
          Scholarship
        </p>
        <p className="meta">
          Data Structures & Algorithms, Databases, AI, Operating Systems,
          Computer Networks
        </p>
      </section>

      <section>
        <h2>Experience</h2>
        <div className="role">Alignerr — AI Code Trainer</div>
        <div className="meta">Jan 2025 – May 2025</div>
        <ul>
          <li>Evaluated and optimized AI-generated code for training models</li>
          <li>Implemented Java-based procedural dungeon generation</li>
          <li>
            Authored summaries explaining AI reasoning for educational datasets
          </li>
        </ul>

        <div className="role">Sun Devil Athletics — Tutor & Student Advisor</div>
        <div className="meta">Mar 2024 – Present</div>
        <ul>
          <li>Improved student-athlete grades by 15% through STEM support</li>
          <li>Streamlined study plans for NCAA eligibility</li>
        </ul>

        <div className="role">Boundary.0 @ ASU — Vice President</div>
        <div className="meta">Feb 2025 – Present</div>
        <ul>
          <li>
            Organized events connecting 100+ international students with
            companies
          </li>
          <li>Increased participation by 40% in professional development</li>
        </ul>

        <div className="role">
          ASU Research — Mesh-Graph-Net, Undergraduate Coder
        </div>
        <div className="meta">Mar 2025 – Aug 2025</div>
        <ul>
          <li>
            Implemented Graph Neural Network components for flagella simulation
          </li>
          <li>Collaborated on preprocessing and mesh dynamics visualization</li>
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="role">
          Secure Task Management with Role-Based Access Control
        </div>
        <div className="meta">
          TypeScript, NestJS, Angular, NX, TypeORM, SQLite, JWT · Jan 2026
        </div>
        <ul>
          <li>Full-stack system with JWT auth and bcrypt password hashing</li>
          <li>Role-based access with organization-aware data isolation</li>
          <li>NX monorepo with shared libraries for end-to-end type safety</li>
        </ul>

        <div className="role">Efficient Graph Processing Algorithm</div>
        <div className="meta">C++ · Oct 2023</div>
        <ul>
          <li>
            Implemented Dijkstra's algorithm with custom Vertex/Edge classes
          </li>
          <li>Managed dynamic memory without advanced containers</li>
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <p className="skills">
          Java · C · C++ · Python · TypeScript · HTML · CSS · JavaScript · REST
          APIs · Angular · NestJS · Flutter · FastAPI · Git · PostgreSQL ·
          SQLite
        </p>
      </section>
    </>
  );
}
