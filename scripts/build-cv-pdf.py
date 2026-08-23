"""
Builds the downloadable CV PDF that /about links to.

It mirrors the web page: same cream/ink palette from tokens.css, the same
section order (Education, Professional Experience, Certifications, Skills,
Extra-Curriculars), the same tag line under each heading, and the same bio
paragraphs. Keep the two in sync when either changes.

Fonts are the closest system stand-ins for the site's Archivo / Inter / IBM Plex
Mono, which ship as .woff2 only. For a version in the real typefaces, open /about
in a browser and print to PDF with background graphics enabled.

Run:  python3 scripts/build-cv-pdf.py public/vanessa-tam-cv.pdf
"""
import os
import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether,
)

# --- Palette, lifted from src/styles/tokens.css --------------------------
BG = HexColor("#f6f1e4")
INK = HexColor("#1c1a16")
MUTED = HexColor("#78705f")
HAIRLINE = HexColor("#dad2c0")
ACCENT = HexColor("#b25133")

for name, path in {
    "Head": "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
    "Body": "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    "Mono": "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
}.items():
    pdfmetrics.registerFont(TTFont(name, path))

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
CONTENT_W = PAGE_W - 2 * MARGIN
# Sub-sections sit flush to the left margin by default. Set CV_INDENT_MM to
# step them in from it (the reference's offset was 14mm) without editing code:
#   CV_INDENT_MM=14 python3 scripts/build-cv-pdf.py out.pdf
INDENT = float(os.environ.get("CV_INDENT_MM", "0")) * mm
KEY_W = 34 * mm           # left column of every dated / keyed row

S = {
    "name": ParagraphStyle("name", fontName="Head", fontSize=26, leading=30, textColor=INK),
    "credential": ParagraphStyle("credential", fontName="Mono", fontSize=7.5, leading=11,
                                 textColor=ACCENT, spaceBefore=7),
    "contact": ParagraphStyle("contact", fontName="Mono", fontSize=7.5, leading=12, textColor=MUTED),
    "statement": ParagraphStyle("statement", fontName="Head", fontSize=14, leading=18.5, textColor=INK),
    "lead": ParagraphStyle("lead", fontName="Body", fontSize=10, leading=15, textColor=INK),
    "blockTitle": ParagraphStyle("blockTitle", fontName="Head", fontSize=13, leading=17, textColor=INK),
    "blockTags": ParagraphStyle("blockTags", fontName="Mono", fontSize=6.5, leading=10, textColor=INK,
                                spaceBefore=4),
    "blockIntro": ParagraphStyle("blockIntro", fontName="Body", fontSize=9, leading=14, textColor=MUTED),
    "years": ParagraphStyle("years", fontName="Mono", fontSize=8, leading=12, textColor=MUTED),
    "place": ParagraphStyle("place", fontName="Mono", fontSize=7, leading=11, textColor=MUTED),
    "role": ParagraphStyle("role", fontName="Head", fontSize=11, leading=14, textColor=INK),
    "roleSm": ParagraphStyle("roleSm", fontName="Head", fontSize=9.5, leading=13, textColor=INK),
    "org": ParagraphStyle("org", fontName="Body", fontSize=9, leading=13, textColor=MUTED, spaceBefore=2),
    "item": ParagraphStyle("item", fontName="Body", fontSize=8.5, leading=13, textColor=INK),
    "key": ParagraphStyle("key", fontName="Mono", fontSize=8, leading=13, textColor=MUTED),
    "value": ParagraphStyle("value", fontName="Body", fontSize=9, leading=14, textColor=INK),
}

EMAIL = "vanessatamvt@gmail.com"
PHONE = "+1 (604) 362-3678"
LOCATION = "Vancouver, British Columbia"

STATEMENT = ("Vanessa is a UK-registered Architect (ARB) and Vancouver-based Project Designer with "
             "5+ years of professional experience spanning Canada, Hong Kong, and Italy.")
LEAD = ("Holding a Master&#8217;s from Politecnico di Milano, she excels in high-density residential "
        "developments and strategic urban design interventions. Currently driving multi-unit housing "
        "projects at RWA Group, she expertly navigates local building code frameworks, managing "
        "permit submissions and on-site inspections with local AHJs.")
PRACTICE_INTRO = ("Specializing in construction administration from IFC to project occupancy, Vanessa "
                  "provides top-tier firms with a rare combination of global design perspective, "
                  "technical precision, and proven project delivery.")

EDUCATION = [
    ("2018 — 2021", "Milan, Italy", "Master of Science in Architecture and Urban Design",
     "Politecnico di Milano", []),
    ("2013 — 2017", "Hong Kong", "Bachelor of Social Science in Architectural Design",
     "The Chinese University of Hong Kong", []),
]

EXPERIENCE = [
    ("Feb 2024 — Present", "Vancouver, Canada", "Project Designer", "RWA Group Architecture Ltd", [
        ("Symposia at SFU — Mosaic Homes",
         "234-unit concrete high-rise and podium with ground-level commercial"),
        ("Trailside at Lynn — Mosaic Homes", "61 units, wood-frame"),
        ("Towns at Lynn — Mosaic Homes", "46 townhomes · 2025 ADP Design Award of Excellence"),
        ("Eastward — Intracorp Homes",
         "136 units, wood-frame; project designer from framing to occupancy"),
        ("Arbutus — Intracorp Homes", "tender and contract administration"),
        ("Large-scale public transit project", "contract administration"),
    ]),
    ("Jul 2021 — Mar 2023", "Hong Kong", "Architectural Assistant", "Ronald Lu &amp; Partners", [
        ("The Knightsbridge, Kai Tak",
         "detail design, contract administration, construction coordination and government "
         "submission on a 563-unit concrete high-rise development"),
        ("HKUST campus expansion", "conceptual masterplan for competition"),
        ("Commercial building renovation and change of use",
         "feasibility study through spatial coordination and building control application"),
        ("Competition entries and concept design", "institutional masterplan and residential schemes"),
    ]),
    ("2017 — 2018", "Hong Kong", "Year-Out Intern", "RAD Ltd", [
        ("Luohu and Houhai Nanshan redevelopment", "feasibility to concept design"),
        ("Shenzhen R&amp;D Twin Towers", "invited competition entry"),
        ("CR Chengdu Hotel (Hyatt Mumian)", "spatial coordination to early construction"),
        ("Sanya and Goldcoast hotels", "concept and schematic design"),
    ]),
    ("2015", "Hong Kong", "Intern", "P&amp;T Architects and Engineers Ltd", []),
    ("2014", "Shanghai", "Intern", "Kohn Pedersen Fox", []),
    ("2014", "Shanghai", "Intern", "P&amp;T Architects and Engineers Ltd", []),
]

CERTIFICATIONS = [
    ("2026", "In progress to register as Intern Architect", "AIBC"),
    ("2024", "Architect — Architects Registration Board (ARB), UK", "Reg. 112155C"),
    ("2023", "Advanced Diploma in Professional Practice in Architecture (RIBA Part 3)",
     "Royal Institute of British Architects"),
    ("2023", "LEED Green Associate", "Green Business Certification Inc."),
    ("2021", "Autodesk Certified Professional — Revit for BIM", "Autodesk"),
    ("2021", "V-Ray for Revit Professional Certificate", "Chaos"),
    ("2020", "Introductory Certificate in Project Management", "IPMA"),
]

SKILLS = [
    ("Software", "Rhinoceros · Grasshopper · Revit · AutoCAD · SketchUp · Enscape · V-Ray · QGIS · "
                 "Photoshop · Illustrator · InDesign · Lightroom", ""),
    ("Languages", "English, Cantonese and Chinese — native.<br/>Spanish, French and Italian — elementary.", ""),
]

EXTRAS = [
    ("2020", "IDEA League Urban Mobility Concept Program", "Smart City Expo, online"),
    ("2019", "International Workshop of Urban and Architectural Design, XII Edition",
     "Lecco, Italy — the Ver-corso Visconti proposal"),
    ("2017", "Fun Under the Flyover", "community project, Hong Kong"),
    ("2015", "Sub-divided unit research", "The Chinese University of Hong Kong"),
    ("2015", "Volunteer, Hong Kong Arts Festival", ""),
]


def rule(width, color=HAIRLINE):
    t = Table([[""]], colWidths=[width], rowHeights=[0.1])
    t.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, 0), 0.5, color),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


# Indented variants of the block styles. The blocks are offset from the left
# margin like the reference, but they must still FLOW — wrapping a whole block
# in one table makes it unsplittable, and Professional Experience is taller than
# a page. So the offset lives on each flowable instead: leftIndent on the
# paragraphs, hAlign="RIGHT" on the fixed-width tables.
for _k in ("blockTitle", "blockTags", "blockIntro"):
    S[_k + "Ind"] = ParagraphStyle(_k + "Ind", parent=S[_k], leftIndent=INDENT)


def block_header(title, tags):
    """Heading, tag line, hairline — the reference's block opener."""
    parts = [Paragraph(title, S["blockTitleInd"])]
    if tags:
        parts.append(Paragraph(tags, S["blockTagsInd"]))
        parts.append(Spacer(1, 3))
    else:
        parts.append(Spacer(1, 8))
    r = rule(CONTENT_W - INDENT)
    r.hAlign = "RIGHT"
    parts.append(r)
    parts.append(Spacer(1, 10))
    return parts


def entry(years, place, role, org, items, role_style="role"):
    when = [Paragraph(years, S["years"])]
    if place:
        when.append(Paragraph(place, S["place"]))
    what = [Paragraph(role, S[role_style]), Paragraph(org, S["org"])]
    for text, note in items:
        line = text
        if note:
            line += f'  <font color="#78705f" size="7.5">{note}</font>'
        what.append(Spacer(1, 4))
        what.append(Paragraph(line, S["item"]))

    body_w = CONTENT_W - INDENT - KEY_W - 6 * mm
    t = Table([[when, what]], colWidths=[KEY_W, body_w])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEABOVE", (0, 0), (-1, 0), 0.4, HAIRLINE),
    ]))
    t.hAlign = "RIGHT"
    return t


def keyed(key, value, note):
    val = value
    if note:
        val += f'<br/><font name="Mono" size="6.5" color="#78705f">{note}</font>'
    body_w = CONTENT_W - INDENT - KEY_W - 6 * mm
    t = Table([[Paragraph(key, S["key"]), Paragraph(val, S["value"])]], colWidths=[KEY_W, body_w])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEABOVE", (0, 0), (-1, 0), 0.4, HAIRLINE),
    ]))
    t.hAlign = "RIGHT"
    return t


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setFont("Mono", 6.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 10 * mm, "VANESSA TAM — CURRICULUM VITAE")
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, f"{doc.page}")
    canvas.restoreState()


def build(out_path):
    doc = BaseDocTemplate(
        out_path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=18 * mm,
        title="Vanessa Tam — Curriculum Vitae", author="Vanessa Tam",
        subject="Architect, ARB (UK) — Vancouver, British Columbia",
    )
    doc.addPageTemplates([PageTemplate(
        id="cv",
        frames=[Frame(MARGIN, 18 * mm, CONTENT_W, PAGE_H - MARGIN - 18 * mm, id="main",
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)],
        onPage=on_page,
    )])

    story = []

    # --- Masthead -------------------------------------------------------
    story.append(Paragraph("Vanessa Tam", S["name"]))
    story.append(Paragraph("ARCHITECT — ARB, UK", S["credential"]))
    story.append(Spacer(1, 10))
    gap = "&nbsp;" * 3
    story.append(Paragraph(gap.join((EMAIL, PHONE, LOCATION)), S["contact"]))
    story.append(Spacer(1, 14))

    # --- Opening statement: accent panel beside the bio's first paragraph -
    panel_w = 32 * mm
    panel = Table([[""]], colWidths=[panel_w], rowHeights=[panel_w])
    panel.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT)]))
    top = Table([[panel, Paragraph(STATEMENT, S["statement"])]],
                colWidths=[panel_w, CONTENT_W - panel_w - 8 * mm])
    top.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), 8 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(top)
    story.append(Spacer(1, 14))
    story.append(Paragraph(LEAD, S["lead"]))
    story.append(Spacer(1, 9))
    story.append(Paragraph(PRACTICE_INTRO, S["lead"]))
    story.append(Spacer(1, 18))

    # --- Titled blocks, indented like the reference ----------------------
    def add_block(title, tags, rows):
        # The header is kept with the first row so a heading never strands
        # itself at the foot of a page; the rest flows and may split.
        head = block_header(title, tags)
        if rows:
            story.append(KeepTogether(head + rows[:1]))
            # Each later row keeps itself whole, but only one level deep —
            # nesting KeepTogether inside KeepTogether breaks its measurement.
            story.extend(KeepTogether([r]) for r in rows[1:])
        else:
            story.extend(head)
        story.append(Spacer(1, 16))

    add_block("Education", "HONG KONG / ITALY",
              [entry(y, p, r, o, i, "roleSm") for y, p, r, o, i in EDUCATION])

    exp_rows = [entry(y, p, r, o, i) for y, p, r, o, i in EXPERIENCE]
    add_block("Professional Experience", "CANADA / HONG KONG / CHINA", exp_rows)

    add_block("Certifications", "", [keyed(y, n, iss) for y, n, iss in CERTIFICATIONS])
    add_block("Skills", "DIGITAL SKILLS / LANGUAGES", [keyed(k, v, n) for k, v, n in SKILLS])
    add_block("Extra-Curriculars", "COMMUNITY / NON-PROFIT / FURTHER EDUCATION",
              [keyed(y, t, n) for y, t, n in EXTRAS])

    doc.build(story)


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "vanessa-tam-cv.pdf")
