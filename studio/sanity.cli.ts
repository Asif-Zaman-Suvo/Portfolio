import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "pildwb46kf8nivbxiypv93hr",
    autoUpdates: true,
  },
});
