const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const createExecutionRuntime = async (req, res) => {
    const userCode = req.body.code;

    if (!userCode) {
        return res.status(400).json({ error: 'No code provided!' });
    }

    const filename = `user_code_${Date.now()}.js`;
    const filePath = path.join(__dirname, filename);

    try {
        fs.writeFileSync(filePath, userCode);

        const dockerCommand = `docker run --rm --memory=128m --cpus=0.5 --network=none -v "${filePath}:/app/user_code.js" node:slim node /app/user_code.js`;

        exec(dockerCommand, { timeout: 20_000 }, (error, stdout, stderr) => {
            fs.unlinkSync(filePath);
            console.log(error)
            console.log(stderr)
            if (error) {
                return res.send({ error: stderr || 'Code execution failed.' });
            }
            res.status(200).send({ result: stdout });
        });
    } catch (err) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
}

module.exports = createExecutionRuntime;
