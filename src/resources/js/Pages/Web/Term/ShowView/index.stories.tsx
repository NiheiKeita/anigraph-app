import { Meta, StoryObj } from '@storybook/react'
import ShowView from '.'

const meta: Meta<typeof ShowView> = {
    title: 'views/Web/Term/ShowView',
    component: ShowView,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
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
