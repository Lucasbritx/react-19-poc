// https://vike.dev/config
import vikeReact from 'vike-react/config'
import vikePhoton from 'vike-photon/config'

export default {
  // https://vike.dev/extends
  extends: [vikeReact, vikePhoton],
  // https://vike.dev/clientRouting
  clientRouting: true,
  // https://vike.dev/hydrationCanBeAborted
  hydrationCanBeAborted: true
}
