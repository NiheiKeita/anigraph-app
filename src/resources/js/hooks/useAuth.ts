import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"

export const useAuth = () => {
    const { props } = usePage<PageProps>()
    const authUser = props?.auth?.user

    return {
        authUser
    }
}
