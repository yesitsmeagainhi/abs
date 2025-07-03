// lib/courses.ts  (feel free to convert to JSON)
export type Course = {
  id: number
  slug: string          // kebab-case, unique
  title: string
  imageUrl: string
  imageAlt: string
  degreePrograms: string
  duration: string
  eligibility: string
  description: string   // long-form HTML/MDX/markdown if you like
}

export const courses: Course[] = [
  {
    id: 1,
    slug: 'operation-theatre-technology',
    title: "Bachelor's in Operation Theatre Technology (OTT)",
    imageUrl: '/uploads/operation-theatre-tech.jpg',
    imageAlt: 'Medical professionals in an operation theatre',
    degreePrograms: 'B.Sc. (Hons.) or B.Sc. or B.Voc.',
    duration: '3 or 4 years (Including 18-24 months of integrated internship)',
    eligibility: '10+2 (any stream, pass) *',
    description: `
      <p>Operation Theatre Technology prepares … (add as much HTML /
      markdown as you like here).</p>
      <ul class="list-disc pl-5">
        <li>Assistance in surgery</li>
        <li>Instrument sterilisation</li>
      </ul>
    `,
  },
  /* …other courses… */
]
