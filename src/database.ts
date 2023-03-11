import { open } from 'sqlite'

import config from './config'

export const openDatabase = () => open(config.database)
