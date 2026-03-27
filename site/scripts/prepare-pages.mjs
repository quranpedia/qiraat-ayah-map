import { copyFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dist_dir = path.resolve('dist')

await copyFile(path.join(dist_dir, 'index.html'), path.join(dist_dir, '404.html'))
await writeFile(path.join(dist_dir, '.nojekyll'), '')
