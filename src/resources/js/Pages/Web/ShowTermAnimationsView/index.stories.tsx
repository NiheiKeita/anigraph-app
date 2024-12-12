import { Meta, StoryObj } from '@storybook/react'
import ShowTermAnimationsView from '.'

const meta: Meta<typeof ShowTermAnimationsView> = {
    title: 'views/Web/ShowTermAnimationsView',
    component: ShowTermAnimationsView,
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
