import { Meta, StoryObj } from '@storybook/react'
import ShowView from '.'

const meta: Meta<typeof ShowView> = {
    title: 'views/Web/User/ShowView',
    component: ShowView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        user: {
            id: "1",
            name: "2024",
        },
    },
}
