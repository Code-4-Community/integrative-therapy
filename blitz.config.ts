import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import db from "db"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "integrative-therapy",
      isAuthorized: simpleRolesIsAuthorized,
    }),
    (_, res, next) => {
      // Inject the db into the context
      res.blitzCtx.db = db
      return next()
    },
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
