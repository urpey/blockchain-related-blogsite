import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'

export function useToken() {
    const token = useSelector((state:RootState)=>state.user.token)
    return token
}
