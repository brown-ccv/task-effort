import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { removeCursor } from '../lib/utils'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const rewardProbability = (duration, blockSettings, opts) => {
  const startCode = eventCodes.rewardProbabilityStart
  const endCode = eventCodes.rewardProbabilityEnd

  let probability = blockSettings.is_practice ? opts : opts.prob

  return {
    type: 'html_keyboard_response',
    stimulus: '',
    response_ends_trial: false,
    trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>${probability}</h1>`, true) +
      photodiodeGhostBox()
    },
    on_load: () => {
      removeCursor('experiment')
      pdSpotEncode(startCode)
    },
    on_finish: (data) => {
      pdSpotEncode(endCode)
      data.code = [startCode, endCode]
      data.rew_prob = probability
      data.subtrial_type = 'reward_prob'
    }
  }
}

export default rewardProbability
