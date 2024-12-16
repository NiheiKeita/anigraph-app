import { Meta, StoryObj } from '@storybook/react'
import { AnimeEditCard } from '.'

const meta: Meta<typeof AnimeEditCard> = {
    title: '/components/AnimeEditCard',
    component: AnimeEditCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        anime: {
            id: 12790,
            title: "終末トレインどこへいく？",
            title_kana: "しゅうまつとれいんどこへいく",
            title_en: "Shuumatsu Train Doko e Iku?",
            media: "tv",
            official_site_url: "https://shumatsu-train.com/",
            wikipedia_url: "https://ja.wikipedia.org/wiki/%E7%B5%82%E6%9C%AB%E3%83%88%E3%83%AC%E3%82%A4%E3%83%B3%E3%81%A9%E3%81%93%E3%81%B8%E3%81%84%E3%81%8F%3F",
            facebook_image_url: "https://shumatsu-train.com/core_sys/images/others/ogp.jpg",
            season_name: "2024-spring",
        },
        onClickEvaluation: () => { }
    },
}
