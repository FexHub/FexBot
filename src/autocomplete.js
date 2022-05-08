import fetch from "node-fetch";

async function autocomplete(interaction) {
    if (interaction.commandName === "math") {
        let name;
        await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(interaction.options.getFocused())}`).then(async res => name = await res.text())
        interaction.respond([{
            name,
            value: interaction.options.getFocused()
        }])
    }
}

export default autocomplete;