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
	
	private Color[] colors = {Color.white, Color.red, Color.green, Color.yellow, Color.cyan, Color.pink, Color.lightGray};
	
	public static void main(String[] args) {

		AdvancedSudoku frame = new AdvancedSudoku();
		frame.fillGrid(9);
		
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
				labels[i][j] = new JLabel(""+grid[i][j], JLabel.CENTER);
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
