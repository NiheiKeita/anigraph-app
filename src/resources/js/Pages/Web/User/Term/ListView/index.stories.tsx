import { Meta, StoryObj } from '@storybook/react'
import ListView from '.'

const meta: Meta<typeof ListView> = {
    title: 'views/Web/User/Term/ListView',
    component: ListView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        terms: [{
            id: "1",
            year: "2024",
            season: "spring"
        }],
    },
}
