import { Meta, StoryObj } from '@storybook/react'
import UserShowView from '.'

const meta: Meta<typeof UserShowView> = {
    title: 'views/Web/UserShowView',
    component: UserShowView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Test: Story = {
    play: async () => {
    },
}
