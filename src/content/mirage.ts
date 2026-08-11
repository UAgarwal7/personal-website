/**
 * Content for the Metadata Mirage writeup, kept as typed data separate from the
 * components that render it — the cloud sibling of the MQTT tenant-isolation lab.
 *
 * Everything here is grounded in the public lab repo and its recorded demo — a
 * demonstrated misconfiguration chain, not a disclosed CVE. Transcripts are
 * trimmed from the recorded run (secrets redacted), not reconstructed.
 */

export const repoUrl = 'https://github.com/UAgarwal7/AWS-Mirage'
export const castUrl =
  'https://github.com/UAgarwal7/AWS-Mirage/blob/main/mirage-demo.cast'

/** The one load-bearing line of the defense. */
export const imdsLine = 'http_tokens = "required"'

/**
 * The whole fix, as a minimal diff: the hardened instance is the vulnerable one
 * with a single metadata flag flipped. Rendered with +/-/space gutters.
 */
export const metadataDiff = [
  { sign: ' ', text: 'metadata_options {' },
  { sign: ' ', text: '  http_endpoint               = "enabled"' },
  { sign: '-', text: '  http_tokens                 = "optional"' },
  { sign: '+', text: '  http_tokens                 = "required"' },
  { sign: ' ', text: '  http_put_response_hop_limit = 1' },
  { sign: ' ', text: '}' },
]

/** SSRF against IMDSv1 hands over the role's temporary credentials. */
export const transcriptCreds = `>> SSRF -> leak the instance role name from IMDS
leaked role: metadata-mirage-instance-role

>> SSRF -> steal the role's temporary credentials
{
  "Code" : "Success",
  "Type" : "AWS-HMAC",
  "AccessKeyId" : "ASIAXXXXXXXXXXXXXXXX",
  "SecretAccessKey" : "REDACTED",
  "Token" : "REDACTED",
  "Expiration" : "2026-08-11T12:36:58Z"
}

>> Pivot -> who are we now?
"Arn": "arn:aws:sts::<acct>:assumed-role/metadata-mirage-instance-role/i-0ed898df34e38de85"`

/** The role cannot read its own policy, yet escalates blind and lands as admin. */
export const transcriptPrivesc = `>> Enumerate -> what is this role allowed to do?
AccessDenied: iam:ListAttachedRolePolicies is not authorized
AccessDenied: iam:GetPolicy is not authorized

>> Boundary check BEFORE privesc (expected: denied)
AccessDenied: iam:ListUsers is not authorized  (denied, as expected -- not admin yet)

>> PRIVESC -> overwrite our own attached policy with *:* and set it default
{ "PolicyVersion": { "VersionId": "v2", "IsDefaultVersion": true } }

>> Boundary check AFTER privesc (expected: now allowed = full admin)
{ "Users": [ { "UserName": "lab-admin", "Arn": "arn:aws:iam::<acct>:user/lab-admin" } ] }`

/** Same attack against the hardened instance — dead at the credential-theft step. */
export const transcriptHardened = `>> SSRF -> leak the instance role name from IMDS
leaked role:

>> SSRF -> steal the role's temporary credentials

>> No credentials returned.
>> IMDSv2 is enforced: the attacker's plain GET to IMDS is rejected.
>> The chain dies right here. Nothing to escalate.`
