/**
 * Content for the MQTT tenant-isolation writeup, kept as typed data separate
 * from the components that render it.
 *
 * Everything here is grounded in the public lab repo and its recorded demo —
 * a demonstrated misconfiguration, not a disclosed CVE.
 */

export const repoUrl = 'https://github.com/UAgarwal7/mqtt-tenant-isolation-lab'
export const castUrl =
  'https://github.com/UAgarwal7/mqtt-tenant-isolation-lab/blob/main/recordings/demo.cast'

/** The one load-bearing line of the defense. */
export const aclLine = 'pattern readwrite %u/#'

/**
 * The whole config change, as a minimal diff: the hardened broker is the
 * vulnerable one plus a single directive. Rendered with +/space gutters.
 */
export const configDiff = [
  { sign: ' ', text: 'listener 1883' },
  { sign: ' ', text: 'allow_anonymous false' },
  { sign: ' ', text: 'password_file /mosquitto/config/passwd' },
  { sign: '+', text: 'acl_file /mosquitto/config/aclfile' },
]

/** Real output from the recorded run — trimmed, not reconstructed. */
export const transcriptVulnerable = `>> tenant_b publishes its secret
[tenant_b] published to tenant_b/telemetry: SECRET::tenant_b turbine rpm=8421 key=hunter2

>> tenant_a subscribes to '#' and listens
[tenant_a] LEAKED <- tenant_b/telemetry: SECRET::tenant_b turbine rpm=8421 key=hunter2
[tenant_a] captured 1 message(s) -- ISOLATION BROKEN`

export const transcriptHardened = `>> tenant_a subscribes to '#' and listens
[tenant_a] connected (rc=Success), subscribing to '#'
[tenant_a] subscription result reason_codes=[Granted QoS 1]
[tenant_a] captured nothing -- isolation holding`
