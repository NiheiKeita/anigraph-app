import { Meta, StoryObj } from '@storybook/react'
import ListView from '.'

const meta: Meta<typeof ListView> = {
    title: 'views/Web/User/ListView',
    component: ListView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        users: [{
            id: "1",
            name: "1",
        }],
    },
}
