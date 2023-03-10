import * as exec from '@actions/exec'
import {getComposerCacheDir} from '../../src/utils'

jest.mock('@actions/core')

describe('getComposerCacheDir using SUT', () => {
  test('returns the real Composer cache directory', async () => {
    let localComposerCacheDir = ''

    const composerExecOptions = {
      silent: true,
      listeners: {
        stdout: (data: Buffer) => (localComposerCacheDir += data.toString())
      }
    }

    await exec.exec('composer', ['--global', 'config', 'cache-dir'], composerExecOptions)

    expect(await getComposerCacheDir()).toEqual(localComposerCacheDir.trim())
  })
})
