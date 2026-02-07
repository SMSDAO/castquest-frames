# Security Policy

> CastQuest Frames security policies, vulnerability reporting, and best practices

---

## Table of Contents

- [Supported Versions](#supported-versions)
- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [Security Best Practices](#security-best-practices)
- [Authentication & Authorization](#authentication--authorization)
- [Data Protection](#data-protection)
- [Smart Contract Security](#smart-contract-security)
- [Infrastructure Security](#infrastructure-security)
- [Incident Response](#incident-response)

---

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          | End of Support |
| ------- | ------------------ | -------------- |
| 2.x.x   | ✅ Yes             | -              |
| 1.x.x   | ⚠️ Security only   | 2026-06-30     |
| < 1.0   | ❌ No              | 2026-01-01     |

**Current Version:** 2.0.0 (Production Ready)

---

## Reporting a Vulnerability

### How to Report

We take security vulnerabilities seriously. If you discover a security issue, please:

**DO NOT** open a public GitHub issue.

Instead, please report vulnerabilities through one of these channels:

1. **Email (Preferred):** security@castquest.io
2. **Encrypted Email:** Use our [PGP key](#pgp-key)
3. **Bug Bounty Program:** [bounty.castquest.io](https://bounty.castquest.io)

### What to Include

Please provide as much information as possible:

- **Type of vulnerability** (e.g., XSS, SQLi, access control)
- **Full path of affected source file(s)**
- **Location of affected source code** (tag/branch/commit)
- **Step-by-step reproduction** instructions
- **Proof of concept** or exploit code (if possible)
- **Impact assessment** (what can an attacker do?)
- **Suggested fix** (if you have one)

### Response Timeline

| Stage | Timeline |
|-------|----------|
| **Initial Response** | Within 24 hours |
| **Severity Assessment** | Within 48 hours |
| **Update on Progress** | Every 5 business days |
| **Fix Development** | Based on severity (see below) |
| **Public Disclosure** | 90 days or after fix is deployed |

### Severity Levels

| Severity | Fix Timeline | Examples |
|----------|--------------|----------|
| **Critical** | 24-48 hours | Remote code execution, authentication bypass |
| **High** | 7 days | SQL injection, XSS, privilege escalation |
| **Medium** | 30 days | CSRF, information disclosure |
| **Low** | 90 days | Minor information leaks, configuration issues |

---

## Security Best Practices

### For Developers

#### Code Security

**Always:**
- ✅ Validate all user inputs
- ✅ Use parameterized queries (Drizzle ORM)
- ✅ Sanitize output to prevent XSS
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Follow principle of least privilege

**Never:**
- ❌ Store secrets in code
- ❌ Trust user input
- ❌ Use eval() or similar
- ❌ Expose sensitive error messages
- ❌ Disable security features
- ❌ Use weak random number generators

#### Input Validation Example

```typescript
import { z } from 'zod';

// Define schema
const UserInputSchema = z.object({
  email: z.string().email().max(255),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  age: z.number().int().min(13).max(120)
});

// Validate input
export async function createUser(req: Request, res: Response) {
  try {
    const validated = UserInputSchema.parse(req.body);
    // Use validated data
  } catch (error) {
    return res.status(400).json({ error: 'Invalid input' });
  }
}
```

#### SQL Injection Prevention

```typescript
// ✅ GOOD: Using Drizzle ORM (parameterized)
const users = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, userEmail));

// ❌ BAD: Raw SQL with string concatenation
// const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
```

#### XSS Prevention

```typescript
// ✅ GOOD: React automatically escapes
<div>{userContent}</div>

// ✅ GOOD: Explicit sanitization
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(userContent);

// ❌ BAD: dangerouslySetInnerHTML with unsanitized content
// <div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### For Operators

#### Environment Security

```bash
# ✅ GOOD: Secure environment variables
NEXTAUTH_SECRET=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
DATABASE_URL="postgresql://user:$(openssl rand -base64 16)@..."

# ❌ BAD: Weak secrets
# NEXTAUTH_SECRET=mysecret
# ADMIN_JWT_SECRET=12345
```

#### Server Hardening

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure firewall**
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   sudo ufw enable
   ```

3. **Disable root login**
   ```bash
   # /etc/ssh/sshd_config
   PermitRootLogin no
   PasswordAuthentication no
   ```

4. **Use fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

---

## Authentication & Authorization

### JWT Token Security

**Token Configuration:**

```typescript
// apps/admin/lib/auth.ts
export const authConfig = {
  jwt: {
    secret: process.env.ADMIN_JWT_SECRET!,
    expiresIn: '7d',
    algorithm: 'HS256'
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60   // Refresh daily
  }
};
```

**Token Validation:**

```typescript
import jwt from 'jsonwebtoken';

export async function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
```

### Role-Based Access Control (RBAC)

**Permission Checking:**

```typescript
// packages/sdk/src/permissions/PermissionsService.ts
export class PermissionsService {
  hasPermission(user: User, permission: Permission): boolean {
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    return rolePermissions.includes(permission);
  }
  
  requirePermission(user: User, permission: Permission): void {
    if (!this.hasPermission(user, permission)) {
      throw new ForbiddenError(`Missing permission: ${permission}`);
    }
  }
}
```

**Middleware:**

```typescript
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const { valid, payload } = validateToken(token);
  
  if (!valid) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = payload;
  next();
}
```

### Password Security

**Hashing:**

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- No common passwords (check against list)

---

## Data Protection

### Encryption at Rest

**Database Encryption:**

```sql
-- Enable PostgreSQL encryption
ALTER DATABASE castquest SET ssl = on;

-- Encrypt sensitive columns
CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE users 
SET email_encrypted = pgp_sym_encrypt(email, :encryption_key);
```

**File Encryption:**

```typescript
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';

export function encrypt(text: string, key: Buffer): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}
```

### Data in Transit

**TLS/SSL Configuration:**

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name castquest.io;
    
    ssl_certificate /etc/nginx/ssl/castquest.io.crt;
    ssl_certificate_key /etc/nginx/ssl/castquest.io.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### Data Retention

| Data Type | Retention Period | After Retention |
|-----------|------------------|-----------------|
| User account data | Active + 2 years | Anonymize |
| Transaction logs | 7 years | Archive |
| Audit logs | 5 years | Archive |
| Session data | 30 days | Delete |
| Temporary files | 24 hours | Delete |

---

## Smart Contract Security

### Audit Process

**Pre-Deployment Checklist:**

- [ ] Code review by senior developer
- [ ] Automated security scanning (Slither, Mythril)
- [ ] Unit test coverage > 90%
- [ ] Integration testing
- [ ] Third-party security audit
- [ ] Testnet deployment and testing
- [ ] Bug bounty program

**Security Tools:**

```bash
# Install tools
pip3 install slither-analyzer mythril

# Run Slither
cd packages/contracts
slither .

# Run Mythril
myth analyze contracts/CASTToken.sol

# Run tests with coverage
forge test
forge coverage
```

### Common Vulnerabilities

**1. Reentrancy Protection:**

```solidity
// ✅ GOOD: Using ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MediaMarket is ReentrancyGuard {
    function buy() external payable nonReentrant {
        // Safe from reentrancy
    }
}
```

**2. Integer Overflow:**

```solidity
// ✅ GOOD: Solidity 0.8+ has built-in overflow checks
uint256 balance = 100;
balance += 50; // Will revert if overflow

// Or use SafeMath for older versions
```

**3. Access Control:**

```solidity
// ✅ GOOD: Use modifiers
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

function setFee(uint256 _fee) external onlyOwner {
    fee = _fee;
}
```

### Emergency Procedures

**Pause Functionality:**

```solidity
import "@openzeppelin/contracts/security/Pausable.sol";

contract MediaToken is Pausable {
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function transfer(address to, uint256 amount) 
        public 
        whenNotPaused 
        returns (bool) 
    {
        // Transfer logic
    }
}
```

---

## Infrastructure Security

### API Security

**Rate Limiting:**

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);
```

**CORS Configuration:**

```typescript
import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://castquest.io', 'https://admin.castquest.io']
    : ['http://localhost:3000', 'http://localhost:3010'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Logging & Monitoring

**Security Event Logging:**

```typescript
export function logSecurityEvent(event: SecurityEvent) {
  logger.warn('Security Event', {
    type: event.type,
    severity: event.severity,
    user: event.user,
    ip: event.ip,
    timestamp: new Date().toISOString(),
    details: event.details
  });
  
  // Send alert for critical events
  if (event.severity === 'critical') {
    alertTeam(event);
  }
}
```

**Audit Trail:**

```typescript
export async function auditLog(action: string, user: User, details: any) {
  await db.insert(auditLogs).values({
    action,
    userId: user.id,
    timestamp: new Date(),
    details: JSON.stringify(details),
    ipAddress: user.ipAddress
  });
}
```

---

## Incident Response

### Response Plan

**Phase 1: Detection & Analysis (0-2 hours)**

1. Incident detected via monitoring/report
2. Assess severity and scope
3. Assemble response team
4. Document initial findings

**Phase 2: Containment (2-4 hours)**

1. Isolate affected systems
2. Block malicious actors
3. Preserve evidence
4. Implement temporary fixes

**Phase 3: Eradication (4-24 hours)**

1. Identify root cause
2. Remove vulnerability
3. Deploy permanent fix
4. Verify fix effectiveness

**Phase 4: Recovery (24-72 hours)**

1. Restore services gradually
2. Monitor for recurring issues
3. Validate data integrity
4. Return to normal operations

**Phase 5: Post-Incident (1-2 weeks)**

1. Conduct post-mortem
2. Document lessons learned
3. Update security measures
4. Improve detection systems

### Contact Information

**Security Team:**

- **Primary:** security@castquest.io
- **Emergency:** +1-XXX-XXX-XXXX
- **PGP Key:** [Available at keybase.io/castquest](https://keybase.io/castquest)

**Escalation Path:**

1. Security Engineer (Level 1)
2. Security Lead (Level 2)
3. CTO (Level 3)
4. CEO (Level 4)

---

## Security Resources

### Internal Resources

- [Security Training Materials](./security/training/)
- [Vulnerability Database](./security/vulnerabilities/)
- [Security Checklist](./security/checklist.md)
- [Incident Response Playbook](./security/incident-response.md)

### External Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)

---

## PGP Key

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[PGP Key content - obtain from keybase.io/castquest]
-----END PGP PUBLIC KEY BLOCK-----
```

---

## Bug Bounty Program

### Scope

**In Scope:**
- Web applications (user and admin dashboards)
- API endpoints
- Smart contracts
- Authentication and authorization
- Data storage and transmission

**Out of Scope:**
- Third-party services
- Social engineering
- Physical attacks
- Denial of Service (DoS/DDoS)

### Rewards

| Severity | Reward Range |
|----------|--------------|
| Critical | $5,000 - $25,000 |
| High | $1,000 - $5,000 |
| Medium | $250 - $1,000 |
| Low | $100 - $250 |

Learn more: [bounty.castquest.io](https://bounty.castquest.io)

---

## Compliance

We comply with:

- **GDPR** - General Data Protection Regulation
- **CCPA** - California Consumer Privacy Act
- **SOC 2 Type II** - Security, availability, and confidentiality
- **PCI DSS** - Payment card security (for payment processing)

---

**Last Updated:** 2026-02-07  
**Version:** 2.0.0

---

**Questions?** Email security@castquest.io
