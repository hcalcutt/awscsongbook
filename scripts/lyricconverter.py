def generate_html(input_file, output_file):
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        # Read and split songs by '----'
        songs = infile.read().strip().split('----')
        
        for song in songs:
            lines = song.strip().split('\n')
            bold_lines = []
            regular_lines = []
            
            # Skip the first line and use it for dynamic ID and player name
            dynamic_id = lines[0].strip().replace(" ", "").lower() + "-lyrics"
            player_name = lines[0].title()
            
            # Process remaining lines
            song_lines = lines[1:]  # Exclude the first line

            # Separate bold and regular lines
            for line in song_lines:
                if line.strip() == "":
                    break
                bold_lines.append(line)
            
            regular_lines = song_lines[len(bold_lines):]
            
            # Write the song in HTML format
            outfile.write(
                f'<div id="{dynamic_id}" class="lyrics" style="display:none;">\n'
                '    <div class="lyrics-header">\n'
                f'        <h3>{player_name} Lyrics</h3>\n'
                '        <button id="mute-button" class="lyrics-button" onclick="toggleMute()">Mute</button>\n'
                '    </div>\n'
            )
            outfile.write('    <p>\n')
            for bold_line in bold_lines:
                outfile.write(f'        <strong>{bold_line.strip()}</strong><br>\n')
            for regular_line in regular_lines:
                if regular_line.strip():  # Ignore empty lines
                    outfile.write(f'        {regular_line.strip()}<br>\n')
            outfile.write('    </p>\n')
            outfile.write('</div>\n\n')  # Close the song's <div> and add spacing between songs

# File paths
input_file = "../lyrics/arsenallyrics.txt"  # Correct spelling of "arsenal"
output_file = "../lyrics/arsenallyrics.html"

# Generate the HTML
generate_html(input_file, output_file)
print(f"HTML file generated: {output_file}")
