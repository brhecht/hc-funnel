const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageBreak, ExternalHyperlink, PageNumber } = require('docx');

const NAVY = "1A2332";
const CORAL = "E8845A";
const LIGHT_BG = "F0F2F5";
const WHITE = "FFFFFF";
const BORDER = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };
const CELL_MARGINS = { top: 100, bottom: 100, left: 140, right: 140 };

const concepts = [
  {
    id: "C1", name: "The Polite Pass", angle: "Pain Angle (Cold)",
    formats: ["Feed (4:5 — 1080×1350)", "Story (9:16 — 1080×1920)"],
    urls: [
      "https://app.adcreative.ai/generated/ad-creatives/682186/921587",
      "https://app.adcreative.ai/generated/ad-creatives/682186/921588"
    ],
    overlay: '"We\'re going to pass." — every investor',
    headline: "What Investors See (But Won't Say)",
    cta: "Take the Assessment",
    image: "Guy in hoodie, coffee shop (Polite Pass.png)",
    primaryText: "\"We're going to pass for now, but please keep us updated.\"\n\nYou've gotten this email from an investor.\n\nProbably more than once. Here's what they don't tell you: it's rarely the idea. It's the 2-3 things in how you pitch that make investors hesitate — patterns they see in the first 5 minutes but will never point out.\n\nThis free 3-minute assessment shows you what investors actually see when you pitch. 4 scores across the dimensions that matter. Built from 2,500+ pitches analyzed.",
    scores: ["100/100", "100/100"]
  },
  {
    id: "C2", name: "The Room You Can't Read", angle: "Dunning-Kruger (Cold)",
    formats: ["Feed (4:5 — 1080×1350)", "Story (9:16 — 1080×1920)"],
    urls: [
      "https://app.adcreative.ai/generated/ad-creatives/682186/921590",
      "https://app.adcreative.ai/generated/ad-creatives/682186/921591"
    ],
    overlay: "He thinks the pitch is going well. The investor tuned out five minutes ago.",
    headline: "Do You Misread Investor Signals?",
    cta: "Take the Assessment",
    image: "Brian's real photo — founder + VC coffee shop (c2-new-reference-brian.png)",
    primaryText: "You're in a pitch meeting. The investor says \"This is really interesting.\"\n\nYou're thinking: great sign. You're wrong.\n\n\"Interesting\" means they're figuring out if they need to act now — or can wait and watch from the sideline. It's not a yes. It's not a no. It's a test most founders don't know they're taking.\n\nThe signals investors send are almost never what they seem. This free 3-minute assessment scores you on the 4 dimensions investors actually evaluate — including the ones they'll never mention.",
    scores: ["100/100", "100/100"]
  },
  {
    id: "C4", name: "Built From the Other Side", angle: "Authority (Retargeting)",
    formats: ["Feed (4:5 — 1080×1350)", "Story (9:16 — 1080×1920)"],
    urls: [
      "https://app.adcreative.ai/generated/ad-creatives/682186/921592",
      "https://app.adcreative.ai/generated/ad-creatives/682186/921593"
    ],
    overlay: "2,500+ founder pitches analyzed. See what investors see.",
    headline: "See What Investors Really See",
    cta: "Take the Assessment",
    image: "Mentor portrait (Built From the Other Side.png)",
    primaryText: "After 2,500+ founder pitches analyzed, the pattern is always the same:\n\nThe best founders don't have better ideas. They understand how investors think.\n\nThey know that \"interesting\" doesn't mean interested. They know when to stop talking. They know the difference between pushing information at an investor and creating pull.\n\nThis assessment was built by someone who's raised capital and invested it — to show founders the gaps nobody in their world will point out.",
    scores: ["100/100", "100/100"]
  }
];

function makeConceptSection(concept) {
  const children = [];
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 200 },
    children: [new TextRun({ text: `${concept.id}: "${concept.name}"`, bold: true, size: 32, font: "Arial", color: NAVY })]
  }));
  children.push(new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: "Angle: ", bold: true, size: 22, font: "Arial", color: NAVY }),
      new TextRun({ text: concept.angle, size: 22, font: "Arial" })
    ]
  }));
  const copyRows = [
    ["Text Overlay", concept.overlay],
    ["Primary Text", concept.primaryText],
    ["Meta Headline", concept.headline],
    ["CTA Button", concept.cta],
    ["Background Image", concept.image],
  ];
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [2800, 6560],
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: BORDERS, width: { size: 9360, type: WidthType.DXA }, columnSpan: 2,
          shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: CELL_MARGINS,
          children: [new Paragraph({ children: [new TextRun({ text: "Ad Copy (from FINAL-COPY-SHEET.md)", bold: true, size: 20, font: "Arial", color: WHITE })] })] }) ] }),
      ...copyRows.map(([label, value]) => new TableRow({ children: [
          new TableCell({ borders: BORDERS, width: { size: 2800, type: WidthType.DXA },
            shading: { fill: LIGHT_BG, type: ShadingType.CLEAR }, margins: CELL_MARGINS,
            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial" })] })] }),
          new TableCell({ borders: BORDERS, width: { size: 6560, type: WidthType.DXA }, margins: CELL_MARGINS,
            children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, font: "Arial" })] })] })
        ] }))
    ]
  }));
  children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
  concept.formats.forEach((format, i) => {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 },
      children: [new TextRun({ text: `${format}`, bold: true, size: 26, font: "Arial", color: NAVY })]
    }));
    children.push(new Paragraph({ spacing: { after: 40 },
      children: [
        new TextRun({ text: `Conversion Score: ${concept.scores[i]}`, bold: true, size: 22, font: "Arial", color: CORAL })
      ]
    }));
    children.push(new Paragraph({ spacing: { after: 80 },
      children: [
        new TextRun({ text: "AdCreative.ai: ", size: 20, font: "Arial", bold: true }),
        new ExternalHyperlink({
          children: [new TextRun({ text: concept.urls[i], style: "Hyperlink", size: 18, font: "Arial" })],
          link: concept.urls[i]
        })
      ]
    }));
    children.push(new Table({
      width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
      rows: [new TableRow({
        height: { value: 4000, rule: "atLeast" },
        children: [new TableCell({
          borders: { top: { style: BorderStyle.DASHED, size: 2, color: CORAL },
                     bottom: { style: BorderStyle.DASHED, size: 2, color: CORAL },
                     left: { style: BorderStyle.DASHED, size: 2, color: CORAL },
                     right: { style: BorderStyle.DASHED, size: 2, color: CORAL } },
          width: { size: 9360, type: WidthType.DXA },
          shading: { fill: "FDF6F3", type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 200, right: 200 },
          verticalAlign: "center",
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 200 },
              children: [new TextRun({ text: "CLICK LINK ABOVE TO VIEW CREATIVE", bold: true, size: 24, font: "Arial", color: CORAL })] }),
            new Paragraph({ alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${concept.id} — ${format}`, size: 20, font: "Arial", color: "888888" })] })
          ]
        })]
      })]
    }));
    children.push(new Paragraph({ spacing: { after: 100 }, children: [] }));
    children.push(new Paragraph({ spacing: { after: 200 },
      children: [
        new TextRun({ text: "\u2610 ", size: 24, font: "Arial" }),
        new TextRun({ text: "Brian Approved", bold: true, size: 22, font: "Arial", color: NAVY }),
        new TextRun({ text: "  |  ", size: 20, font: "Arial", color: "AAAAAA" }),
        new TextRun({ text: "\u2610 ", size: 24, font: "Arial" }),
        new TextRun({ text: "Needs Changes", size: 22, font: "Arial" }),
        new TextRun({ text: "  — Notes: ___________________________", size: 20, font: "Arial", color: "888888" })
      ]
    }));
  });
  children.push(new Paragraph({ children: [new PageBreak()] }));
  return children;
}

function makeLinksTable() {
  const headerRow = new TableRow({
    children: ["#", "Concept", "Format", "Score", "Link"].map((text, i) => {
      const widths = [400, 2200, 2200, 1000, 3560];
      return new TableCell({
        borders: BORDERS, width: { size: widths[i], type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: CELL_MARGINS,
        children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, font: "Arial", color: WHITE })] })]
      });
    })
  });
  let rowNum = 0;
  const dataRows = concepts.flatMap(c =>
    c.formats.map((fmt, i) => {
      rowNum++;
      const widths = [400, 2200, 2200, 1000, 3560];
      const values = [String(rowNum), `${c.id}: ${c.name}`, fmt, c.scores[i], c.urls[i]];
      return new TableRow({
        children: values.map((text, j) => {
          const cellChildren = j === 4
            ? [new Paragraph({ children: [new ExternalHyperlink({
                children: [new TextRun({ text: "Open Project", style: "Hyperlink", size: 18, font: "Arial" })],
                link: text
              })] })]
            : [new Paragraph({ children: [new TextRun({ text, size: 18, font: "Arial" })] })];
          return new TableCell({
            borders: BORDERS, width: { size: widths[j], type: WidthType.DXA },
            shading: { fill: rowNum % 2 === 0 ? LIGHT_BG : WHITE, type: ShadingType.CLEAR },
            margins: CELL_MARGINS, children: cellChildren
          });
        })
      });
    })
  );
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [400, 2200, 2200, 1000, 3560],
    rows: [headerRow, ...dataRows]
  });
}

async function main() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, font: "Arial", color: NAVY },
          paragraph: { spacing: { before: 300, after: 200 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: "Arial", color: NAVY },
          paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1200, right: 1440, bottom: 1200, left: 1440 }
        }
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [new TextRun({ text: "HC Ad Creative Batch — Brian Audit", size: 18, font: "Arial", color: "888888" })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Humble Conviction  |  Page ", size: 16, font: "Arial", color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "888888" })
          ]
        })] })
      },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: "HC Funnel — Ad Creative Batch", bold: true, size: 40, font: "Arial", color: NAVY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
          children: [new TextRun({ text: "Brian's Audit Document", size: 26, font: "Arial", color: CORAL })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "March 20, 2026  |  3 Concepts × 2 Formats = 6 Creatives  |  All scores 97-100/100", size: 20, font: "Arial", color: "888888" })] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "Quick Links — All 6 Creatives", bold: true, size: 28, font: "Arial", color: NAVY })] }),
        makeLinksTable(),
        new Paragraph({ spacing: { after: 100 }, children: [] }),
        new Paragraph({ spacing: { after: 100 },
          children: [new TextRun({ text: "Landing page: ", bold: true, size: 20, font: "Arial" }),
            new ExternalHyperlink({
              children: [new TextRun({ text: "quiz.humbleconviction.com", style: "Hyperlink", size: 20, font: "Arial" })],
              link: "https://quiz.humbleconviction.com"
            })] }),
        new Paragraph({ children: [new PageBreak()] }),
        ...concepts.flatMap(c => makeConceptSection(c)),
      ]
    }]
  });
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/Users/Nmejia/Developer/HC-Ad-Creative-Batch-v2.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Done! Written to:", outPath);
}
main().catch(console.error);
