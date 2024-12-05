import { Meta, StoryObj } from '@storybook/react'
import Top from '.'

const meta: Meta<typeof Top> = {
    title: 'views/Web/Top',
    component: Top,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Test: Story = {
    play: async ({ canvasElement }) => {
        // const canvas = within(canvasElement)
        // await waitFor(async () => {
        //   canvas.getByText("QuestionListView")
        // })
    },
}
