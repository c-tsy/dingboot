# powershell
use powershell in nodejs

## example
```typescript
import PowerShell from './index';
(async () => {
    let p = new PowerShell()
    try {
        console.log(await p.cmd(`echo 1`))
        console.log(await p.cmd(`echo 2`))
        console.log(await p.cmd(`echo $True`))
        console.log(await p.cmd(`echo $False`))
    } catch (error) {

    }
    p.process.kill()
    process.exit();
})()
function timeout(n: number) {
    return new Promise((s) => setTimeout(s, n))
}
```
the result
```
1                   test.ts:5
2                   test.ts:6
True                test.ts:7
False               test.ts:8
```