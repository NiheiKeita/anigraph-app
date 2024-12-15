import { Term } from "@/types/term"

export const useTerm = () => {
    const groupedTerms = (terms: Term[]) => {
        const items: Record<string, Term[]> = terms.reduce<Record<string, Term[]>>((acc, term) => {
            if (!acc[term.year]) {
                acc[term.year] = []
            }
            acc[term.year].push(term)
            return acc
        }, {})
        return items
    }

    return { groupedTerms }
}
