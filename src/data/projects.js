export const projects = [
  {
    slug: "tech-conf-central",
    num: "01",
    title: "TechConfCentral",
    category: "Conference Platform",
    tagline:
      "An ASP.NET Core MVC platform for discovering and managing tech conferences.",
    description:
      "A full-stack conference platform where public users browse conferences, filter schedules, and explore speakers; registered users save talks to a personal schedule; and administrators manage conferences, talks, speakers, tracks, and rooms through a secured portal with enforced scheduling business rules.",
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "SQL Server", "Bootstrap 5"],
    image:
      "https://raw.githubusercontent.com/Fejiro001/tech-conf-central/main/home.png",
    live: "https://github.com/Fejiro001/tech-conf-central",
    github: "https://github.com/Fejiro001/tech-conf-central",
    year: "2026",
    role: "Full Stack",
    narrative: {
      problem:
        "Discovering and running a technology conference means juggling schedules, speakers, tracks, and rooms, while making sure no two talks collide in the same space and every session actually fits within the conference window. The goal was a single platform that served three audiences at once: anonymous visitors exploring the schedule, registered users curating a personal agenda, and administrators enforcing the rules behind the scenes.",
      approach:
        "I built it as a layered ASP.NET Core MVC application with controllers and ViewModels in the presentation layer, services in the business layer, and repositories over Entity Framework Core and SQL Server in the data layer. ASP.NET Core Identity handled authentication with role-based authorization gating the admin CRUD surfaces, and Bootstrap 5 carried a responsive, consistent UI. ViewComponents kept speaker and talk details reusable across pages.",
      hurdles: [
        {
          title: "Enforcing scheduling rules",
          detail:
            "Talks can't overlap in the same room, must sit inside the conference's date range, and must end after they start. I centralized those checks in the service layer so every create and update path validated against the same rules — the UI could never let an invalid schedule slip through."
        },
        {
          title: "Layering without leakage",
          detail:
            "A conference domain invites thick controllers. I kept the presentation layer thin by pushing logic into services and data access into repositories, so controllers only coordinated — which made the business rules testable and the codebase easier to extend."
        },
        {
          title: "Personal schedules with auth",
          detail:
            "Letting users save talks meant tying ASP.NET Core Identity to a SavedTalk join table, with a business rule preventing duplicates. The same identity system drove role-based access so admins and visitors saw exactly what they were allowed to."
        }
      ],
      solution:
        "The result is a platform that scales across its three audiences: visitors filter and browse schedules, registered users build personal agendas, and administrators get full CRUD with scheduling rules enforced at the source — all on a layered architecture that stays maintainable as the domain grows.",
      snippets: [
        {
          label: "Room overlap validation (service layer)",
          language: "csharp",
          code: `public bool HasOverlap(int roomId, DateTime start, DateTime end, int? excludeId = null)
{
    return _context.Talks.Any(t =>
        t.RoomId == roomId &&
        (excludeId == null || t.Id != excludeId) &&
        t.StartTime < end && start < t.EndTime);
}

public void CreateTalk(Talk talk)
{
    if (talk.EndTime <= talk.StartTime)
        throw new ValidationException("End time must be after start time.");
    if (HasOverlap(talk.RoomId, talk.StartTime, talk.EndTime))
        throw new ValidationException("This room already has a talk at that time.");
    _context.Talks.Add(talk);
    _context.SaveChanges();
}`
        },
        {
          label: "Repository over EF Core",
          language: "csharp",
          code: `public class TalkRepository : ITalkRepository
{
    private readonly AppDbContext _ctx;
    public TalkRepository(AppDbContext ctx) => _ctx = ctx;

    public IEnumerable<Talk> GetByConference(int confId) =>
        _ctx.Talks
            .Include(t => t.Speaker)
            .Include(t => t.Room)
            .Where(t => t.ConferenceId == confId)
            .ToList();
}`
        }
      ]
    }
  },
  {
    slug: "detective-case-file-system",
    num: "02",
    title: "Detective Case File System",
    category: "Case Management Application",
    tagline:
      "A themed ASP.NET Core MVC system for managing forensic cases, suspects, and evidence.",
    description:
      "A full-CRUD case management application with a dark 'Forensic Vault' aesthetic. It manages active cases, suspects, and logged evidence, maintaining strict data relationships and chain-of-custody integrity. Features dynamic cascading dropdowns that filter suspects by the selected case, and risk-level-aware UI styling for high-threat records.",
    tech: ["ASP.NET Core MVC", "C#", "LINQ", "Bootstrap 5", "JavaScript"],
    image:
      "https://raw.githubusercontent.com/Fejiro001/detective-case-file-system/main/homepage.png",
    live: "https://github.com/Fejiro001/detective-case-file-system",
    github: "https://github.com/Fejiro001/detective-case-file-system",
    year: "2026",
    role: "Full Stack",
    narrative: {
      problem:
        "Managing forensic data means keeping cases, suspects, and evidence in realistic relationships — evidence belongs to suspects who belong to cases — while logging records flexibly enough that evidence can be filed before a suspect is assigned. The challenge was to make those relationships strict yet practical, inside an interface that felt like an actual investigative tool rather than a generic CRUD scaffold.",
      approach:
        "I built it with ASP.NET Core MVC over LINQ and in-memory collections, following strict separation of concerns through Models, ViewModels, Controllers, and Razor Views. JavaScript event listeners handled cascading data — the suspect dropdown filtering to suspects linked to the selected case when logging evidence. A custom dark-mode stylesheet styled records by threat level, with dedicated visual treatments for ArmedAndDangerous and Extreme risk entries.",
      hurdles: [
        {
          title: "Cascading case-to-suspect dropdowns",
          detail:
            "When logging evidence, the suspect list has to reflect the currently selected case — not every suspect in the system. I wired a change listener on the case dropdown that fetched only the linked suspects, so the form always presented a valid, scoped set of options."
        },
        {
          title: "Threat-level-aware UI",
          detail:
            "A flat list of suspects ignores how dangerous a record is. I styled cards differently for ArmedAndDangerous and Extreme risk levels, surfacing visual warnings that an investigator would actually scan for — without cluttering low-risk entries."
        },
        {
          title: "Flexible evidence assignment",
          detail:
            "Real investigations log evidence before they know who it belongs to. I decoupled evidence creation from suspect assignment so a record could be filed independently and linked to a suspect later, while still enforcing the relationship once the link existed."
        }
      ],
      solution:
        "The result is a themed, relationship-aware case file system that mirrors real investigative workflows — cascading data keeps input valid, threat-level styling keeps critical records visible, and flexible assignment keeps the evidence pipeline practical.",
      snippets: [
        {
          label: "LINQ — suspects scoped to a case",
          language: "csharp",
          code: `public IEnumerable<Suspect> GetSuspectsForCase(int caseId) =>
    _suspects
        .Where(s => s.CaseId == caseId)
        .OrderBy(s => s.LastName)
        .ToList();

public IActionResult SuspectsByCase(int caseId) =>
    Json(_service.GetSuspectsForCase(caseId)
        .Select(s => new { id = s.Id, name = s.FullName }));`
        },
        {
          label: "Cascading dropdown (client side)",
          language: "javascript",
          code: `caseSelect.addEventListener("change", async () => {
  const res = await fetch(
    \`/Evidence/SuspectsByCase?caseId=\${caseSelect.value}\`
  );
  const suspects = await res.json();
  suspectSelect.innerHTML = suspects
    .map((s) => \`<option value="\${s.id}">\${s.name}</option>\`)
    .join("");
});`
        }
      ]
    }
  },
  {
    slug: "weather-now",
    num: "03",
    title: "Weather Now",
    category: "Weather Application",
    tagline: "A real-time, location-aware weather experience.",
    description:
      "A real-time weather experience built around location-aware data and interactive forecasts. Provides hourly and 7-day forecasts, multi-location comparison, saved locations, and smart weather-based recommendations.",
    tech: ["React", "API", "Zustand", "Geolocation", "Tailwind CSS"],
    image:
      "https://fejiro001.github.io/my-portfolio/assets/media/images/projects/weather-app.webp",
    live: "https://weather-app-pearl-seven-35.vercel.app/",
    github: "https://github.com/Fejiro001/weather-app",
    award: "Frontend Mentor Challenge Winner",
    year: "2025",
    role: "Frontend & Architecture",
    narrative: {
      problem:
        "Most weather apps stop at reading a single API response and rendering a temperature. The goal here was to build something that felt like a product — real-time, location-aware, capable of holding multiple saved locations, switching units fluidly, and translating raw meteorological data into genuinely useful, context-aware recommendations.",
      approach:
        "I architected the app around a single source of truth using Zustand, separating weather data, saved locations, and UI preferences (units, active location) into discrete store slices. The browser Geolocation API seeded the default location; a third-party weather API supplied current conditions, hourly, and 7-day forecasts. Tailwind CSS handled a responsive, dark-first interface that stays legible across data densities.",
      hurdles: [
        {
          title: "State without prop drilling",
          detail:
            "With multiple saved locations, a unit toggle, and an active-location switcher all needing to stay in sync, passing props through every component would have created a fragile, deeply-nested tree. Zustand let each component subscribe only to the slice it cared about."
        },
        {
          title: "Geolocation permissions",
          detail:
            "Requesting location on first load can fail silently or be denied. I built a graceful fallback chain — try geolocation, fall back to a default city, and never block the UI on a permission prompt."
        },
        {
          title: "Polling without thrashing",
          detail:
            "Weather data drifts, but hammering the API on every render is wasteful and rate-limit-prone. I debounced refreshes and cached recent responses to keep the UI responsive without redundant network calls."
        }
      ],
      solution:
        "The result is a weather experience that loads instantly on a saved location, updates gracefully in the background, and surfaces smart recommendations (umbrella, UV, wind) alongside the forecast — all driven by a clean, decoupled store architecture.",
      snippets: [
        {
          label: "Locations store slice (Zustand)",
          language: "javascript",
          code: `const useLocationStore = create((set, get) => ({
  locations: [],
  activeId: null,

  addLocation: (loc) =>
    set((s) => ({
      locations: [...s.locations, loc],
      activeId: loc.id,
    })),

  setActive: (id) => set({ activeId: id }),

  removeLocation: (id) =>
    set((s) => ({
      locations: s.locations.filter((l) => l.id !== id),
      activeId: s.activeId === id ? s.locations[0]?.id : s.activeId,
    })),
}));`
        },
        {
          label: "Geolocation with graceful fallback",
          language: "javascript",
          code: `export function useGeolocation() {
  const setActive = useLocationStore((s) => s.setActive);

  useEffect(() => {
    if (!navigator.geolocation) {
      setActive(DEFAULT_LOCATION.id);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setActiveFromCoords(coords),
      () => setActive(DEFAULT_LOCATION.id), // denied or failed — fall back
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, [setActive]);
}`
        }
      ]
    }
  },
  {
    slug: "job-application-tracker-api",
    num: "04",
    title: "Job Application Tracker API",
    category: "REST API / Backend",
    tagline:
      "An N-tier ASP.NET Core Web API for managing job applications, interviews, and skills.",
    description:
      "A RESTful ASP.NET Core 9 Web API built on N-Tier architecture and Entity Framework Core. It gives job seekers a centralized backend for tracking applications, multi-stage interviews, associated skill sets, and target company details — with full CRUD, filtering, sorting, and pagination behind documented Swagger/OpenAPI endpoints.",
    tech: [
      "ASP.NET Core 9",
      "C#",
      "EF Core 9",
      "SQL Server",
      "Swagger / OpenAPI"
    ],
    image:
      "https://raw.githubusercontent.com/Fejiro001/job-application-tracker-api/main/swagger.png",
    live: "https://github.com/Fejiro001/job-application-tracker-api",
    github: "https://github.com/Fejiro001/job-application-tracker-api",
    year: "2026",
    role: "Backend & API Architecture",
    narrative: {
      problem:
        "Job hunting produces scattered data — applications spread across spreadsheets and emails, interview stages tracked in one place, required skills noted nowhere. The goal was a single, well-designed API that modeled the whole domain: users, target companies, applications, multi-stage interviews, and the skills each application demands — with clean contracts that any frontend could consume.",
      approach:
        "I structured it as a strict N-Tier solution: controllers handle routing, parameter binding, and status code responses; a Business Logic Layer owns domain rules, validation, and entity-to-DTO mapping; a Data Access Layer holds repository abstractions over EF Core 9 and SQL Server. Five domain entities with realistic relationships — including a many-to-many between applications and skills through an associative entity — surfaced through versioned routes under /api/v1, documented live in Swagger.",
      hurdles: [
        {
          title: "Modeling the many-to-many",
          detail:
            "Applications and skills needed a genuine many-to-many relationship. I introduced an ApplicationSkill associative entity so EF Core could map the join explicitly, which keeps the association queryable and lets skills be shared across applications without duplication."
        },
        {
          title: "DTO boundaries between layers",
          detail:
            "Entities leaking into controller responses couples your API contract to your database schema. I kept every boundary explicit — entities never leave the DAL, DTOs never touch the DbContext, and the BLL owns the mapping in both directions, so schema changes can't silently break the API contract."
        },
        {
          title: "Honest status codes per endpoint",
          detail:
            "Each route returns what actually happened: 201 with a location for creates, 204 for updates and deletes, 404 for missing records, and 409 when associating a skill that's already linked. Getting the status codes right is what makes an API predictable to consume."
        }
      ],
      solution:
        "The result is a documented, layered API where a job seeker's entire pipeline lives in one coherent model — applications, interview stages, and skills in honest relationships — and where every endpoint behaves predictably for any client that calls it.",
      snippets: [
        {
          label: "Controller with explicit status codes",
          language: "csharp",
          code: `[HttpPatch("{id}/status")]
public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto dto)
{
    var updated = await _bll.UpdateApplicationStatusAsync(id, dto.Status);
    return updated ? NoContent() : NotFound();
}

[HttpPost("{id}/skills")]
public async Task<IActionResult> AssociateSkill(int id, [FromBody] SkillDto dto)
{
    var result = await _bll.AssociateSkillAsync(id, dto);
    if (result == AssociateResult.AlreadyLinked)
        return Conflict(new { message = "Skill already associated." });
    return CreatedAtAction(nameof(GetById), new { id }, null);
}`
        },
        {
          label: "Entity-to-DTO mapping (BLL)",
          language: "csharp",
          code: `public static Application ToEntity(this ApplicationCreateDto dto)
{
    return new Application
    {
        JobTitle = dto.JobTitle,
        JobUrl = dto.JobUrl,
        Status = dto.Status,
        AppliedDate = dto.AppliedDate,
        SalaryMin = dto.SalaryMin,
        SalaryMax = dto.SalaryMax,
        UserId = dto.UserId,
        CompanyId = dto.CompanyId
    };
}`
        }
      ]
    }
  },
  {
    slug: "scoot",
    num: "05",
    title: "Scoot",
    category: "Multi-Page Website",
    tagline: "A responsive multi-page site for a transportation service.",
    description:
      "A responsive multi-page website for a transportation service, featuring clean layouts, structured navigation, and interactive UI elements. Contributed to the home and coming-soon pages while improving codebase quality.",
    tech: ["HTML", "CSS", "Responsive Design", "Team Project"],
    image:
      "https://fejiro001.github.io/my-portfolio/assets/media/images/projects/scoot-website.webp",
    live: "https://fejiro001.github.io/scoot_website",
    github: "https://github.com/Fejiro001/scoot_website",
    year: "2024",
    role: "Frontend Contributor",
    narrative: {
      problem:
        "Scoot needed a multi-page marketing presence for a transportation service — home, about, locations, and a coming-soon page — that felt consistent across pages and stayed fully responsive from mobile to desktop. As a team contribution, the challenge was as much about codebase hygiene and collaboration as it was about the UI itself.",
      approach:
        "I worked within an existing HTML/CSS architecture, owning the home and coming-soon pages end to end. I leaned into a mobile-first stylesheet with a shared partial structure so navigation, footer, and typography stayed consistent without copy-pasting markup. Interactive UI elements (hero transitions, hover states, the coming-soon countdown) were layered in progressively.",
      hurdles: [
        {
          title: "Consistency across contributors",
          detail:
            "With multiple people touching shared CSS, drift was inevitable. I focused on cleanup and bug fixes — normalizing spacing tokens, removing dead selectors, and aligning component patterns so the codebase stayed maintainable."
        },
        {
          title: "The coming-soon interaction",
          detail:
            "A static 'coming soon' page is forgettable. I added a lightweight countdown and subtle entrance motion so the page communicated anticipation without depending on a heavy framework."
        }
      ],
      solution:
        "The shipped pages are clean, responsive, and consistent with the rest of the site — and the codebase behind them is tighter and easier to extend than when I joined, which is the quieter half of frontend work that matters most in a team.",
      snippets: [
        {
          label: "Fluid spacing with clamp",
          language: "css",
          code: `.hero {
  padding: clamp(2rem, 6vw, 6rem) clamp(1.25rem, 4vw, 4rem);
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}`
        }
      ]
    }
  },
  {
    slug: "easybank",
    num: "06",
    title: "EasyBank",
    category: "Landing Page",
    tagline: "A modern, responsive banking landing page.",
    description:
      "A modern, responsive banking landing page with a clean layout and strong visual hierarchy. Implements interactive navigation, refined hover states, and optimized layouts across screen sizes for a smooth user experience.",
    tech: ["HTML", "Sass", "CSS", "Responsive Design"],
    image:
      "https://fejiro001.github.io/my-portfolio/assets/media/images/projects/easybank-website.webp",
    live: "https://fejiro001.github.io/easybank-landing-page-master",
    github: "https://github.com/Fejiro001/easybank-landing-page-master",
    year: "2024",
    role: "Frontend",
    narrative: {
      problem:
        "A banking landing page lives or dies on visual hierarchy and trust. The challenge was translating a precise design into pixel-accurate, fully responsive markup — with overlapping decorative imagery, a sticky interactive nav, and hover states that feel considered rather than tacked on.",
      approach:
        "I built it mobile-first with Sass, using mixins and partials to keep the stylesheet DRY. Decorative mockup images were positioned with layered, clipped containers so their overlaps held at every breakpoint. Navigation became sticky with a mobile hamburger driven by a tiny vanilla-JS toggle.",
      hurdles: [
        {
          title: "Overlapping imagery, responsively",
          detail:
            "The hero mockups overlap the hero copy and bleed off-screen. Naive absolute positioning breaks the moment the viewport changes. I used layered containers with percentage offsets and clip-path so the composition held from mobile to desktop."
        },
        {
          title: "Hover states that scale",
          detail:
            "Generic hovers on every link feel noisy. I scoped interaction to primary CTAs and feature cards, using transitions on transform and color so the page responded to intent without becoming busy."
        }
      ],
      solution:
        "The result is a landing page that reads as premium and structured at any width — strong hierarchy, responsive imagery that never breaks composition, and motion used sparingly to guide attention rather than distract from it.",
      snippets: [
        {
          label: "Sass mixin for layered mockup offset",
          language: "scss",
          code: `@mixin layered-offset($x: 0, $y: 0, $z: 1) {
  position: absolute;
  z-index: $z;
  transform: translate($x, $y);

  @media (max-width: 768px) {
    position: relative;
    transform: none;
  }
}`
        }
      ]
    }
  },
  {
    slug: "advice-generator",
    num: "07",
    title: "Advice Generator",
    category: "Web Application",
    tagline: "A single-interaction app powered by an external API.",
    description:
      "A responsive web application that fetches and displays random pieces of advice from an external API. Users generate new advice with a single interaction, with smooth UI updates designed for an engaging experience.",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    image:
      "https://fejiro001.github.io/my-portfolio/assets/media/images/projects/advice-generator-app.webp",
    live: "https://fejiro001.github.io/advice-generator-app-main",
    github:
      "https://github.com/Fejiro001/advice-generator-app-main?tab=readme-ov-file",
    year: "2024",
    role: "Frontend",
    narrative: {
      problem:
        "A small app with one job — fetch and display a random piece of advice — has nowhere to hide. The interaction has to feel instant and the empty, loading, and error states have to be handled honestly, because a single unhandled failure breaks the entire experience.",
      approach:
        "I built it with vanilla JavaScript and the Fetch API, structured around a small async flow: request → loading state → render, with every branch covered. CSS transitions smoothed the text swap so new advice felt considered rather than abrupt.",
      hurdles: [
        {
          title: "Honest loading & error states",
          detail:
            "A spinner that never resolves, or an error that silently leaves stale advice on screen, erodes trust. I covered pending, success, and failure explicitly, surfacing a retry affordance on error."
        },
        {
          title: "Smooth content swaps",
          detail:
            "Replacing text instantly feels janky. I cross-faded the outgoing and incoming advice so each new draw read as deliberate motion, not a flash."
        }
      ],
      solution:
        "What looks like a tiny app is really an exercise in state discipline — every async branch handled, every transition intentional, and the single interaction polished until it feels effortless.",
      snippets: [
        {
          label: "Async fetch with full state handling",
          language: "javascript",
          code: `async function getAdvice() {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (!res.ok) throw new Error("Request failed");
    const { slip } = await res.json();
    renderAdvice(slip);
  } catch (err) {
    setError("Couldn't load advice. Try again.");
  } finally {
    setLoading(false);
  }
}`
        }
      ]
    }
  }
];
