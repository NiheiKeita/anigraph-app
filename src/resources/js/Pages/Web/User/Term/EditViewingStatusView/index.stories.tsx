import { Meta, StoryObj } from '@storybook/react'
import EditViewingStatusView from '.'

const meta: Meta<typeof EditViewingStatusView> = {
    title: 'views/Web/User/Term/EditViewingStatusView',
    component: EditViewingStatusView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Test: Story = {
    args: {
        term: {
            id: "1",
            year: "2024",
            season: "spring"
        },
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
