import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.util.Arrays;
import java.util.Collections;

import javax.swing.*;


public class AdvancedSudoku extends JFrame {

	Board board;
	
	JPanel gamePanel;
	JLabel[][] labels;
	
			
	//Kelly's 22 colors of maximum contrast
	private Color[] colors = {
			new Color(0xffb300),
			new Color(0x803e75),
			new Color(0xff6800),
			new Color(0xa6bdd7),
			new Color(0xc10020),
			new Color(0xcea262),
			new Color(0x817066),
			new Color(0x7d34),
			new Color(0xf6768e),
			new Color(0x538a),
			new Color(0xff7a5c),
			new Color(0x53377a),
			new Color(0xff8e00),
			new Color(0xb32851),
			new Color(0xf4c800),
			new Color(0x7f180d),
			new Color(0x93aa00),
			new Color(0x593315),
			new Color(0xf13a13),
			new Color(0x232c16)};

//			Color.white, Color.red, Color.green, Color.yellow, Color.cyan, Color.pink, Color.lightGray,
//			new Color(20, 200, 0), new Color(100, 0, 255), new Color(150, 150, 0)};
	
	public static void main(String[] args) {

		AdvancedSudoku frame = new AdvancedSudoku();
		frame.fillGrid(10);
		frame.setVisible(true);
		frame.repaint();
	}
	
	public AdvancedSudoku(){
		
		
		
		this.setTitle("Advanced Sudoku");
		this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		this.setSize(600, 600);
		
		gamePanel = new JPanel();
		this.add(gamePanel);
				
	}
	
	private void initializeColors(int length){
		//TODO
		colors = new Color[length];
		
		int index = 0;
		for (int i = 0; i < colors.length; i++) {
			
		}
	}
	
	private void fillGrid(int length){
		
		Collections.shuffle(Arrays.asList(colors));
		
		board = new Board(length);
		
		int[][] grid = board.getGrid();
		int[][] regions = board.getRegions();
		
		labels = new JLabel[length][length];

		System.out.println(gamePanel.isVisible());
		gamePanel.setLayout(new GridLayout(length,length));

		//Draw the numbers/colors
		for (int i = 0; i < length; i++) {
			for (int j = 0; j < length; j++) {
				labels[i][j] = new JLabel(String.valueOf(grid[i][j]), JLabel.CENTER);
				labels[i][j].setBackground(colors[regions[i][j]]);
				labels[i][j].setOpaque(true);
				labels[i][j].setFont(new Font("Times", Font.BOLD, 40));
				gamePanel.add(labels[i][j]);
			}
		}
		
		//Draw the line seperators
		for (int i = 0; i < length; i++) {
			
		}
		
		
		
		
	}

}
