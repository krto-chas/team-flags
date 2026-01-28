/**
 * Batch check-in script for the team.
 *
 * Usage:
 *   node scripts/batch-checkin.mjs                  # Mark all as present today
 *   node scripts/batch-checkin.mjs --date 2026-01-28
 *   node scripts/batch-checkin.mjs --status excused --comment "Sjukdag"
 */

// ---- Config ----
const BASE_URL = process.env.BASE_URL || 'http://chas-academy-devops-2026.vercel.app';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-admin@email.com'; // ← ändra till din admin-email

const TEAM_EMAILS = [
  // ← Lägg till gruppmedlemmarnas e-postadresser här
  'kristoffer.toivanen@chasacademy.se',
  'albin.mansson@chasacademy.se',
  'jon.eskilsson@chasacademy.se',
  'viktor.myhre@chasacademy.se',
  'joline.stromberg@chasacademy.se'
];
// ---- End config ----

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    date: new Date().toLocaleDateString('sv-SE'),
    status: 'present',
    comment: '',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) opts.date = args[++i];
    if (args[i] === '--status' && args[i + 1]) opts.status = args[++i];
    if (args[i] === '--comment' && args[i + 1]) opts.comment = args[++i];
  }

  return opts;
}

async function markAttendance(studentEmail, opts) {
  const res = await fetch(`${BASE_URL}/api/attendance/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-email': ADMIN_EMAIL,
    },
    body: JSON.stringify({
      studentEmail,
      date: opts.date,
      status: opts.status,
      comment: opts.comment || undefined,
    }),
  });

  const data = await res.json();
  return { status: res.status, data };
}

async function main() {
  const opts = parseArgs();

  console.log(`Marking attendance for ${TEAM_EMAILS.length} students`);
  console.log(`  Date:    ${opts.date}`);
  console.log(`  Status:  ${opts.status}`);
  console.log(`  Admin:   ${ADMIN_EMAIL}`);
  if (opts.comment) console.log(`  Comment: ${opts.comment}`);
  console.log('---');

  for (const email of TEAM_EMAILS) {
    const { status, data } = await markAttendance(email, opts);

    if (status === 200 && data.success) {
      console.log(`  ✓ ${email}`);
    } else {
      console.log(`  ✗ ${email} — ${data.error || 'Unknown error'}`);
    }
  }

  console.log('---');
  console.log('Done.');
}

main().catch((err) => {
  console.error('Script failed:', err.message);
  process.exit(1);
});
