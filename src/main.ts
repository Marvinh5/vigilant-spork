import Vault from "node-vault";

export interface EnvOptions {
  secretEngine: string;
  nodeEnv?: "production" | "development" | "testing";
  vaultHost: string;
  authToken: string;
  key: string;
  loadIntoEnv?: boolean;
}

function loadIntoEnv(data:any, options:EnvOptions) {
	if (data && options.loadIntoEnv) {
		process.env = Object.entries(data).reduce((prev, [key, value]) => {
			prev[String(key).toUpperCase()] = String(value);
			return prev;
		}, process.env);
	}
}

/**
 *	if you use nodeEnv is prefixed to your key path as so /production/${key}
 * @param {EnvOptions}
 * @returns
 */
export async function loadVaultEnv(
  options: EnvOptions
): Promise<Record<string, any> | null> {
  try {
    const endpoint = options.vaultHost || process.env.VAULT_HOST;
    const vault = Vault({
			apiVersion: "v1",
			endpoint
		});
		
		let path = `${options.secretEngine}/data`;

    if (options.nodeEnv != null) path += `/${options.nodeEnv}`;
		path += `/${options.key}`;

    await vault.githubLogin({
      token: options.authToken,
      endpoint,
    });

    const val = await vault.read(path);

    const data: Record<string, string | boolean | number> = val?.data?.data;

		loadIntoEnv(data, options);

    return data;
  
	} catch (err) {
    throw err;
  }
}
