import fetch from "node-fetch";

async function autocomplete(interaction) {
    if (interaction.commandName === "math") {
        try {
            let name;
            await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(interaction.options.getFocused())}`).then(async res => name = await res.text())
            interaction.respond([{
                name,
                value: interaction.options.getFocused()
            }])
        } catch (err) {
            console.log(`\x1b[38;5;197m[❌  | Logs] | User ${interaction.user.username} caught error in command \x1b[36m${interaction.commandName}.\x1B[0m\n${error}`)
        }
    }
}

export default autocomplete;