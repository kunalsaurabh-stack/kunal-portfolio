"use strict";

/* ============ 1. CONTACT CONFIG — REPLACE these with your real details ============
   Leave a value as "" and that link shows as disabled instead of pointing nowhere. */
const CONFIG = {
  email: "kunalsaurabhgond@gmail.com",
  instagram: "https://www.instagram.com/kunaledit11/",
  youtube: "https://www.youtube.com/@KunalEdits-14x",
  linkedin: "",
  formEndpoint: "https://formspree.io/f/xbggkldo"
};

/* ============ 2. PROJECTS — edit each entry, add more, or reorder ============
   video:  YouTube or Vimeo link, or a direct .mp4/.webm URL. Leave "" until it exists.
   thumb:  path like "assets/images/p01.jpg" (keep files small). Leave "" to show the colour placeholder.
   color:  placeholder colour while there is no thumbnail.
   concept: true = labelled "Concept" everywhere. Set false only for real, completed work.
   Layout slots are set in styles.css (.p1 ... .p6) by project id. */
const PROJECTS = [
  { id:1, title:"Product Film", sub:"Skincare Concept", category:"Product film", ratio:"9:16", format:"9:16 vertical advertisement",
    desc:"A vertical product ad built around texture, rhythm and a clear call to action.",
    contribution:"Edit, pacing, captions, sound design",
    objective:"Show how a skincare product can feel premium in under 30 seconds on a phone screen.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro, After Effects",
    approach:"Tight cuts on movement, restrained on-screen text, and sound that leads the visuals.",
    deliverable:"9:16 MP4 for Reels and Shorts",
    video:"", thumb:"", color:"#D9D0E8", concept:true },
  { id:2, title:"Social Campaign", sub:"Coffee Brand Concept", category:"Short-form campaign", ratio:"9:16", format:"9:16 short-form campaign",
    desc:"A short-form series designed to hook fast and stay consistent across posts.",
    contribution:"Edit, captions, pacing, sound",
    objective:"Explore a repeatable visual style for a coffee brand's short-form feed.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro, After Effects",
    approach:"A consistent caption style and beat-led cuts so each clip reads as part of one campaign.",
    deliverable:"Set of 9:16 MP4 clips",
    video:"", thumb:"", color:"#B8C5A5", concept:true },
  { id:3, title:"Product Commercial", sub:"Sportswear Concept", category:"Promotional video", ratio:"9:16", format:"9:16 promotional video",
    desc:"A high-energy vertical promo that builds momentum through cut rhythm.",
    contribution:"Edit, music sync, motion elements",
    objective:"Convey energy and movement for a sportswear product without relying on heavy effects.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro, After Effects",
    approach:"Cuts timed to the music, with simple motion elements that support the footage.",
    deliverable:"9:16 MP4",
    video:"", thumb:"", color:"#D9563B", concept:true },
  { id:4, title:"Brand Story", sub:"Founder Interview Concept", category:"Narrative video", ratio:"16:9", format:"16:9 narrative video",
    desc:"A founder story shaped from interview material into a clear, human narrative.",
    contribution:"Story edit, sequencing, sound",
    objective:"Turn a long interview into a short story with a clear beginning, middle and end.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro",
    approach:"Select the strongest lines first, then build structure, cutaways and music around them.",
    deliverable:"16:9 MP4",
    video:"", thumb:"", color:"#24211F", concept:true },
  { id:5, title:"Technology Promo", sub:"Digital Product Concept", category:"Promotional video", ratio:"16:9", format:"16:9 promotional video",
    desc:"A clean promo that explains a digital product in plain, visual steps.",
    contribution:"Edit, pacing, simple motion graphics",
    objective:"Explain what a digital product does clearly in under a minute.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro, After Effects",
    approach:"One idea per shot, clear text on screen, and calm pacing so the product stays in focus.",
    deliverable:"16:9 MP4",
    video:"", thumb:"", color:"#D9D0E8", concept:true },
  { id:6, title:"Cinematic Storytelling", sub:"Visual Film", category:"Cinematic edit", ratio:"16:9", format:"16:9 cinematic edit",
    desc:"An atmosphere-led edit where sequencing and music carry the story.",
    contribution:"Edit, sequencing, music, sound design",
    objective:"Build mood and meaning through shot order and sound rather than dialogue.",
    role:"Editor (self-initiated concept)", software:"Adobe Premiere Pro, After Effects",
    approach:"Find the emotional arc in the footage, then cut and score to it.",
    deliverable:"16:9 MP4",
    video:"", thumb:"", color:"#B8C5A5", concept:true }
];

/* ============ Code below: no need to edit ============ */
const $ = (s, r = document) => r.querySelector(s);
const byId = id => PROJECTS.find(p => p.id === Number(id));
const pad = n => String(n).padStart(2, "0");
const bg = p => p.thumb ? `background-image:url('${p.thumb}')` : "";

// Contact links
document.querySelectorAll("[data-link]").forEach(a => {
  const v = CONFIG[a.dataset.link];
  if (!v) { a.removeAttribute("href"); a.title = "Not set up yet"; return; }
  a.href = a.dataset.link === "email" ? "mailto:" + v : v;
  if (a.dataset.link !== "email") { a.target = "_blank"; a.rel = "noopener"; }
});
$("#year").textContent = new Date().getFullYear();

// Work grid
$("#grid").innerHTML = PROJECTS.map(p => `
  <button class="card p${p.id}" data-open="${p.id}" data-ratio="${p.ratio}" aria-label="Open ${p.title}, ${p.sub}">
    <span class="poster" style="--c:${p.color};${bg(p)}">
      ${p.concept ? '<span class="tag">Concept</span>' : ""}<span class="play" aria-hidden="true"></span>
    </span>
    <span class="meta"><small>${pad(p.id)} · ${p.category} · ${p.ratio}</small><b>${p.title} — ${p.sub}</b>
    <p>${p.desc}</p><small>${p.contribution}</small></span>
  </button>`).join("");

// Hero frames use thumbnails when set
document.querySelectorAll(".frame[data-open]").forEach(f => { const p = byId(f.dataset.open); if (p && p.thumb) { f.style.backgroundImage = `url('${p.thumb}')`; f.style.backgroundSize = "cover"; } });

// Video embed (loaded only when a project is opened)
function player(p) {
  const v = p.video.trim(), cls = p.ratio === "9:16" ? "r916" : "r169";
  const missing = `<div class="stage ${cls}"><p>${p.concept ? "Concept placeholder. " : ""}Video not added yet. Set <code>video</code> for this project in script.js.</p></div>`;
  if (!v) return missing;
  let m = v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
  if (m) return `<div class="stage ${cls}"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" title="${p.title}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  m = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `<div class="stage ${cls}"><iframe src="https://player.vimeo.com/video/${m[1]}" title="${p.title}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  if (/\.(mp4|webm)(\?.*)?$/i.test(v)) return `<div class="stage ${cls}"><video controls preload="none" playsinline ${p.thumb ? `poster="${p.thumb}"` : ""} src="${v}">Your browser can't play this video.</video></div>`;
  return `<div class="stage ${cls}"><p>This video link can't be embedded. <a href="${v}" target="_blank" rel="noopener" style="color:inherit">Watch it on its own page</a>.</p></div>`;
}

// Project modal
const modal = $("#modal"), body = $("#m-body");
function openProject(id) {
  const p = byId(id); if (!p) return;
  const rel = PROJECTS.filter(x => x.id !== p.id).slice(0, 3);
  body.innerHTML = `<div class="m-in">${player(p)}
    <small class="n">${pad(p.id)} · ${p.category} · ${p.format}</small>
    <h2 id="m-title">${p.title} — ${p.sub}</h2>
    ${p.concept ? "<p><strong>Self-initiated concept.</strong> Not a client project; no brand named here commissioned or endorsed it.</p>" : ""}
    <dl class="facts">
      <div><dt>Creative objective</dt><dd>${p.objective}</dd></div>
      <div><dt>My role</dt><dd>${p.role}</dd></div>
      <div><dt>Software</dt><dd>${p.software}</dd></div>
      <div><dt>Editing approach</dt><dd>${p.approach}</dd></div>
      <div><dt>Final deliverable</dt><dd>${p.deliverable}</dd></div>
    </dl>
    <h3>Related projects</h3>
    <div class="rel">${rel.map(r => `<button class="btn" data-open="${r.id}">${pad(r.id)} ${r.title}</button>`).join("")}</div>
    <a class="btn solid" href="#contact" data-close>Start a project</a></div>`;
  if (!modal.open) { modal.showModal(); document.documentElement.style.overflow = "hidden"; }
  modal.scrollTop = 0;
}
function closeModal() { modal.close(); }
modal.addEventListener("close", () => { body.innerHTML = ""; document.documentElement.style.overflow = ""; }); // clearing stops playback
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
$("#close").addEventListener("click", closeModal);
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o) { openProject(o.dataset.open); return; }
  if (e.target.closest("[data-close]")) closeModal();
});

// Scroll progress
const bar = $("#progress");
addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
}, { passive: true });

// Enquiry form: never shows a fake success message
const form = $("#form"), status = $("#status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  let bad = 0;
  [...form.elements].forEach(f => {
    if (!f.name) return;
    const fail = f.required && !f.value.trim() || f.type === "email" && f.value && !/^\S+@\S+\.\S+$/.test(f.value);
    f.setAttribute("aria-invalid", fail ? "true" : "false"); if (fail) bad++;
  });
  if (bad) { status.textContent = "Please complete the highlighted fields."; form.querySelector('[aria-invalid="true"]').focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!r.ok) throw 0;
      status.textContent = "Sent. Thank you, I'll reply by email."; form.reset();
    } catch { status.textContent = CONFIG.email ? "Couldn't send the form. Please email me directly using the link above." : "Couldn't send the form. Please try again later."; }
    return;
  }
  if (CONFIG.email) {
    const text = `Name: ${d.name}\nEmail: ${d.email}\nProject type: ${d.type}\nBudget: ${d.budget || "-"}\nTimeline: ${d.timeline}\n\n${d.message}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Project enquiry from " + d.name)}&body=${encodeURIComponent(text)}`;
    status.textContent = "Your email app should open with the enquiry filled in. Press send there to finish.";
    return;
  }
  status.textContent = "This form isn't connected yet. Set an email or form endpoint in script.js (CONFIG).";
});
