import { Meta, StoryObj } from '@storybook/react'
import EditView from '.'

const meta: Meta<typeof EditView> = {
    title: 'views/Web/User/AnimationRank/EditView',
    component: EditView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        animations: [{
            id: 0,
            title: '',
            title_kana: '',
            title_en: '',
            media: '',
            official_site_url: '',
            wikipedia_url: '',
            facebook_image_url: '',
            season_name: ''
        }]
    },
}
